import Layout from "../../../components/Layout";
import Card from "../../../components/ui/Card";
import { getSidebarData } from "../../../utils/getSidebarData";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function SubcategoryPage({ sidebarData, guides }) {
  return (
    <Layout sidebarData={sidebarData}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6 capitalize">
          {guides[0]?.subcategory || "Guides"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card
              key={guide.slug}
              title={guide.title}
              category={`${guide.category} > ${guide.subcategory}`}
              blurb={guide.description}
              path={guide.path}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { category, subcategory } = params;
  const contentDir = path.join(process.cwd(), "content", category, subcategory);
  const files = fs.readdirSync(contentDir);
  const guides = files.map((file) => {
    const filePath = path.join(contentDir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    return {
      title: data.title,
      category,
      subcategory,
      description: data.description || "No description available.",
      slug: file.replace(".md", ""),
      path: `${category}/${subcategory}/${file.replace(".md", "")}`,
    };
  });
  const sidebarData = getSidebarData();
  return {
    props: {
      sidebarData,
      guides,
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
      paths.push({
        params: { category, subcategory },
      });
    });
  });

  console.log("Generated paths:", paths);
  return { paths, fallback: false };
}