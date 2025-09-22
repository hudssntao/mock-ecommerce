import { redirect } from "next/navigation";
import type { Product } from "@/entities/Product";
import { api } from "@/trpc/server";
import { serialize } from "@/utils/serialize";
import ClientContainer from "./_components/client-container";

type ProductPageProps = {
  params: {
    slug: string;
  };
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

  return <ClientContainer product={serialize(product)} />;
}
