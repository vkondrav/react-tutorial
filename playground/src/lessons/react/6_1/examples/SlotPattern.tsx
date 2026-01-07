// @ts-nocheck
interface PageLayoutProps {
  header: React.ReactNode; // Named slot
  sidebar: React.ReactNode; // Named slot
  children: React.ReactNode; // Default slot (content)
}

function PageLayout({ header, sidebar, children }: PageLayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

// Usage - full control over each section
<PageLayout header={<NavBar />} sidebar={<SideMenu />}>
  <h1>Page Content</h1>
  <p>Main content goes here...</p>
</PageLayout>;
