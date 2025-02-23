import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "./ui/Sidebar";
import SearchBar from "./SearchBar";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout({ children, frontMatter, sidebarData }) { // Added sidebarData
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" sidebarData={sidebarData} /> {/* Pass prop */}
      <SidebarInset>
        <header className="p-4 flex items-center">
          <SidebarTrigger className="mr-4" />
          <SearchBar />
        </header>
        <main className="p-8">
          <Breadcrumbs frontMatter={frontMatter} />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}