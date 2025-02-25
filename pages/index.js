import Layout from "../components/Layout";
import { getSidebarData } from "../utils/getSidebarData";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function Home({ sidebarData }) {
  return (
    <Layout sidebarData={sidebarData}>
      <div className="flex flex-col items-center justify-center min-h-[calc(70vh-8rem)] p-6">
        <h1 className="text-4xl font-bold text-foreground mb-12">Search Wiki</h1>
        <div className="w-full max-w-2xl space-y-6">
          {/* Manual Search */}
          <div className="flex flex-col items-center gap-2">
            <Input
              placeholder="Search the Wiki..."
              className="w-full h-12 text-lg bg-background border-border text-foreground placeholder-muted-foreground focus:ring-sidebar-ring"
            />
            <span className="text-sm text-muted-foreground">Find articles, guides, and more</span>
          </div>
          {/* Ask Ella */}
          <div className="flex flex-col items-center gap-2">
            <Button
              className="w-full h-12 text-lg bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              Ask Ella
            </Button>
            <span className="text-sm text-muted-foreground">Chat with our platform Master - Ella Aborate</span>
          </div>
        </div>
      </div>
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