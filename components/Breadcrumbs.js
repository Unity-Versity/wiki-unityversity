import Link from "next/link";

export default function Breadcrumbs({ frontMatter }) {
  const { category, subcategory, title } = frontMatter || {};
  return (
    <nav className="text-sm mb-4">
      <Link href="/" className="text-blue-600">
        Home
      </Link>{" "}
      {category && (
        <>
          &gt; <span>{category}</span>{" "}
        </>
      )}
      {subcategory && (
        <>
          &gt; <span>{subcategory}</span>{" "}
        </>
      )}
      &gt; <span>{title}</span>
    </nav>
  );
}