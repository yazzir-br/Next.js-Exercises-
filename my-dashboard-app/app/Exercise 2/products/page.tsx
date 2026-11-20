interface Product {
    id: number;
    title: string;
  }
  
  interface ProductsResponse {
    products: Product[];
  }
  
  export default async function ProductsPage() {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
    const data: ProductsResponse = await res.json();
    const topFiveProducts = data.products.slice(0, 5);
  
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Top 5 Products</h1>
        <ul className="list-disc pl-6 space-y-2">
          {topFiveProducts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    );
  }