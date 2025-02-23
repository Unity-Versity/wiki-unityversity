import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getSidebarData() {
  const contentDir = path.join(process.cwd(), "content");
  const categories = fs.readdirSync(contentDir);
  const data = {};

  categories.forEach((category) => {
    const subDir = path.join(contentDir, category);
    const subs = fs.readdirSync(subDir).map((sub) => {
      const guidesDir = path.join(subDir, sub);
      const guides = fs.readdirSync(guidesDir).map((file) => {
        const filePath = path.join(guidesDir, file);
        const { data } = matter(fs.readFileSync(filePath, "utf8"));
        return {
          title: data.title,
          slug: file.replace(".md", ""),
          path: `${category}/${sub}/${file.replace(".md", "")}`,
        };
      });
      return { name: sub, guides };
    });
    data[category] = subs;
  });

  return data;
}