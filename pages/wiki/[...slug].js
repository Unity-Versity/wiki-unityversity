import Layout from "../../components/Layout";
import { getSidebarData } from "../../utils/getSidebarData";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

export default function WikiPage({ sidebarData, content, frontMatter, relatedArticles }) {
  return (
    <Layout sidebarData={sidebarData} frontMatter={frontMatter}>
      <div className="flex p-6 gap-6">
        {/* Main Article */}
        <div className="flex-1 prose prose-invert max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">{frontMatter.title}</h1>
          <Markdown>{content}</Markdown>
        </div>
        {/* Related Articles */}
        <aside className="w-[28%] hidden lg:block">
          <div className="sticky top-6 bg-card p-4 rounded-lg shadow-md border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Articles</h2>
            <ul className="space-y-2">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <a
                    href={`/wiki/${article.path}`}
                    className="text-sidebar-accent-foreground hover:text-sidebar-primary transition-colors"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join("/");
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter, content } = matter(fileContent);

  // Related articles (simple: same subcategory, exclude current)
  const [category, subcategory] = slug.split("/");
  const subDir = path.join(process.cwd(), "content", category, subcategory);
  const files = fs.readdirSync(subDir);
  const relatedArticles = files
    .filter((file) => file !== `${params.slug[params.slug.length - 1]}.md`)
    .map((file) => {
      const filePath = path.join(subDir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return {
        title: data.title,
        slug: file.replace(".md", ""),
        path: `${category}/${subcategory}/${file.replace(".md", "")}`,
      };
    })
    .slice(0, 5); // Limit to 5

  const sidebarData = getSidebarData();
  return {
    props: {
      sidebarData,
      content,
      frontMatter,
      relatedArticles,
    },
  };
}

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), "content");
  const categories = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const paths = [];

  categories.forEach((category) => {
    const subDir = path.join(contentDir, category);
    const subcategories = fs.readdirSync(subDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    subcategories.forEach((subcategory) => {
      const guideDir = path.join(subDir, subcategory);
      const guides = fs.readdirSync(guideDir, { withFileTypes: true })
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
        .map((dirent) => dirent.name.replace(".md", ""));
      guides.forEach((guide) => {
        paths.push({
          params: { slug: [category, subcategory, guide] },
        });
      });
    });
  });

  return { paths, fallback: false };
}