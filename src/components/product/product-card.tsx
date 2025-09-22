"use client";

import { Card, CardBody, CardFooter, Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import ProductActions from "./product-actions";

interface ProductCardProps {
  ref: ((node?: HTMLDivElement | null) => void) | null;
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  ref,
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <Card
      className="w-[300px] h-[338px] border border-primary rounded-xl p-[12px] shadow-md"
      ref={ref}
    >
      <CardBody className="flex flex-col gap-2 p-0">
        <Link href={`/products/${id}`} className="w-fit">
          <Image
            src={imageUrl}
            alt={name}
            width={276}
            height={156}
            className="w-full h-full rounded-xl object-cover"
          />
        </Link>
        <div className="px-2">
          <h2 className="font-sans font-medium text-lg leading-6 tracking-tight">
            {name}
          </h2>
          <p className="font-sans font-medium text-sm leading-5 tracking-tight text-zinc-400 line-clamp-4">
            {description}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center w-full p-0 pt-1">
        <ProductActions
          id={id}
          name={name}
          description={description}
          price={price}
          imageUrl={imageUrl}
        />
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-[300px] h-[338px] rounded-xl p-[12px] bg-gray-50">
      <CardBody className="flex flex-col gap-2 p-0">
        <Skeleton className="w-[276px] h-[156px] rounded-xl bg-gray-100" />
        <div className="px-2">
          <Skeleton className="h-6 w-3/4 rounded-lg mb-2 bg-gray-100" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-lg bg-gray-100" />
            <Skeleton className="h-4 w-full rounded-lg bg-gray-100" />
            <Skeleton className="h-4 w-2/3 rounded-lg bg-gray-100" />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center w-full p-0 pt-3">
        <Skeleton className="h-10 w-20 rounded-xl bg-gray-100" />
        <Skeleton className="h-10 w-44 rounded-xl bg-gray-100" />
      </CardFooter>
    </Card>
  );
}
