import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/server";
import ProductDetails from "@/components/product/product-details";
import ProductFeed from "@/components/product/product-feed";
import { formatPrice } from "@/utils/format";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productId = Number(slug);

  if (!slug || Number.isNaN(productId) || productId <= 0) {
    return {
      title: "Product Not Found - Not Amazon",
      description: "The requested product could not be found.",
    };
  }

  try {
    const product = await api.product.getById({ id: productId });

    if (!product) {
      return {
        title: "Product Not Found - Not Amazon",
        description: "The requested product could not be found.",
      };
    }

    const price = formatPrice(product.price);
    const title = `${product.name} - ${price} | Not Amazon`;
    const description = `Buy ${product.name} for ${price}. ${product.description.slice(0, 120)}${product.description.length > 120 ? "..." : ""}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: product.imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        type: "website",
        siteName: "Not Amazon",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [product.imageUrl],
      },
    };
  } catch {
    return {
      title: "Product Not Found - Not Amazon",
      description: "The requested product could not be found.",
    };
  }
}

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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Not Amazon",
      },
    },
    brand: {
      "@type": "Brand",
      name: "Not Amazon",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  );
}
