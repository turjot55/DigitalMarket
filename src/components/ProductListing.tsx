import { Product } from "payload-types";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "../lib/utils";
import { PRODUCT_CATEGORIES } from "../config/index";
import { formatPrice } from "../lib/utils";
import ImageSlider from "./ImageSlider";
import { url } from "inspector";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceHolder />;
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.catagory
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <Link
      className={cn("invisible h-full w-full cursor-pointer group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/product/${product.id}`}>
      <div className="flex flex-col w-full">
        <ImageSlider urls={validUrls} />
        <h3 className="mt-4 font-medium text-sm text-gray-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{label}</p>
        <p className="mt-1 font-medium text-sm text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg " />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg " />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg " />
    </div>
  );
};

export default ProductListing;
