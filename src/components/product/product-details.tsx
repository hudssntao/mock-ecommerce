"use client";

import { Image } from "@heroui/react";
import ProductActions from "./product-actions";

type ProductDetailsProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  initialCartQuantity?: number;
};

export default function ProductDetails({
  id,
  name,
  description,
  price,
  imageUrl,
  initialCartQuantity = 0,
}: ProductDetailsProps) {
  return (
    <div className="flex items-center justify-center gap-6 w-[1024px] min-h-[512px]">
      <Image
        width={512}
        height={512}
        src={imageUrl}
        alt={name}
        className="rounded-xl object-cover h-full w-full"
      />
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="font-sans font-medium text-[40px] leading-6 tracking-tight">
          {name}
        </h1>
        <p className="font-sans font-medium text-sm leading-5 tracking-tight text-zinc-400">
          {description}
        </p>
        <ProductActions
          id={id}
          price={price}
          initialCartQuantity={initialCartQuantity}
          className="justify-start gap-4"
        />
      </div>
    </div>
  );
}
