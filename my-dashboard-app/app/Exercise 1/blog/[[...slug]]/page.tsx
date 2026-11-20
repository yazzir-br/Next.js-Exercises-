type Props = {
    params: Promise<{ slug?: string[] }>;
  };
  
  export default async function BlogPage({ params }: Props) {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug?.join("/") || "Home";
    return (
      <main style={{ padding: "20px" }}>
        <h1>You visited: /{slugPath}</h1>
      </main>
    );
  }