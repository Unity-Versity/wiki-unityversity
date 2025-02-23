import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

export default function Guide({ source, frontMatter }) {
  const router = useRouter();
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug || [];
  const filePath = path.join(process.cwd(), 'content', ...slug) + '.md';
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const source = await serialize(content);
  return { props: { source, frontMatter: data } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('content/sites/forms');
  const paths = files.map((file) => ({
    params: { slug: ['sites', 'forms', file.replace('.md', '')] },
  }));
  return { paths, fallback: false };
}