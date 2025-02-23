import Layout from "../components/Layout";
import { getSidebarData } from "../utils/getSidebarData";

export default function Home({ sidebarData }) {
  return (
    <Layout sidebarData={sidebarData}>
      <h1 className="text-4xl font-bold">Welcome to UnityVersity Wiki</h1>
      <p className="mt-4">Your go-to resource for UnityCRM guides.</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const sidebarData = getSidebarData();
  return {
    props: {
      sidebarData,
    },
  };
}