import fs from "fs";
import path from "path";

export function getSidebarData() {
  const contentDir = path.join(process.cwd(), "content");
  const categories = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory()) // Only directories
    .map((dirent) => dirent.name);
  const data = {};

  categories.forEach((category) => {
    const subDir = path.join(contentDir, category);
    const subs = fs.readdirSync(subDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory()) // Only directories
      .map((dirent) => ({
        name: dirent.name, // Exact case from content/
      }));
    data[category] = subs; // Exact case from content/
  });

  return data;
}