import { useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "../../config/index";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductReel from "../../components/ProductReel";

type Param = string | string[] | undefined;

interface ProductPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductPage = ({ searchParams }: ProductPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse High-quality assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductPage;
