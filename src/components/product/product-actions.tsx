import { Button, ButtonGroup } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCartWithSync } from "@/hooks";
import { formatPrice } from "@/utils/format";

type ProductActionsProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  className?: string;
};

export default function ProductActions({
  id,
  name,
  description,
  price,
  imageUrl,
  className,
}: ProductActionsProps) {
  const { updateQuantity, getCartItem } = useCartWithSync();

  const cartItem = getCartItem(id);
  const cartQuantity = cartItem?.quantity || 0;

  const product = {
    id,
    name,
    description,
    price,
    imageUrl,
  };

  const handleAddToCart = async () => {
    await updateQuantity(id, cartQuantity + 1, product);
  };

  const handleRemoveFromCart = async () => {
    await updateQuantity(id, cartQuantity - 1, product);
  };

  return (
    <div className={`flex w-full justify-between items-center ${className}`}>
      <Link href={`/products/${id}`} className="w-fit">
        <Button className="font-sans font-semibold text-sm leading-5 tracking-tight px-[14px] py-[10px]">
          {formatPrice(price)}
        </Button>
      </Link>
      {cartQuantity > 0 ? (
        <ButtonGroup
          variant="flat"
          className="flex w-44 h-10 gap-2 items-center justify-between"
        >
          <Button
            onPress={handleRemoveFromCart}
            className="flex items-center justify-center w-16 h-10 bg-button-primary-background rounded-xl"
          >
            <Minus size={16} />
          </Button>
          {cartQuantity}
          <Button
            onPress={handleAddToCart}
            className="flex items-center justify-center w-16 h-10 bg-button-primary-background rounded-xl"
          >
            <Plus size={16} />
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          onPress={handleAddToCart}
          className="bg-button-primary-background rounded-xl font-sans font-medium text-sm leading-5 tracking-tight w-44 h-10"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}
