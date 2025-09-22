"use client";

import Navbar from "@/components/navbar";
import ProductDetails from "@/components/product/product-details";
import ProductFeed from "@/components/product/product-feed";
import type { Product } from "@/entities/Product";

type ClientContainerProps = {
  product: Product;
};

export default function ClientContainer({ product }: ClientContainerProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <Navbar item_count={0} />

      <div className="w-full flex justify-center">
        <div className="w-[1024px] flex flex-col gap-4">
          <ProductDetails
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            initialCartQuantity={0}
          />

          <div className="flex w-full justify-center">
            <div className="w-[600px] h-px bg-zinc-400"></div>
          </div>

          <h2 className="font-sans font-medium text-[32px] leading-10 tracking-tight">
            Similar Products
          </h2>

          <div className="flex justify-center">
            <ProductFeed batchSize={12} />
          </div>
        </div>
      </div>
    </div>
  );
}
