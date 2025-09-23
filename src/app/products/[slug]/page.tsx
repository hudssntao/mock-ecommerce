import { redirect } from "next/navigation";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/server";
import ProductDetails from "@/components/product/product-details";
import ProductFeed from "@/components/product/product-feed";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productId = Number(slug);

  if (!slug || Number.isNaN(productId) || productId <= 0) {
    redirect("/");
  }

  let product: Product | null;
  try {
    product = await api.product.getById({ id: productId });

    if (!product) {
      redirect("/");
    }
  } catch {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <div className="w-full flex justify-center">
        <div className="w-[1024px] flex flex-col gap-4">
          <ProductDetails
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />

          <div className="flex w-full justify-center">
            <div className="w-[600px] h-px bg-zinc-400"></div>
          </div>

          <h2 className="font-sans font-medium text-[32px] leading-10 tracking-tight">
            Similar Products
          </h2>

          <div className="flex justify-center">
            <ProductFeed batchSize={12} excludeId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
