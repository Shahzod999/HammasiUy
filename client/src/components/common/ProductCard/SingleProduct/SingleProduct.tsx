import React from "react";
import "./singleProduct.scss";
import { useURLState } from "../../../../hooks/useURLState";
import OpenFromSide from "../../OpenFromSide/OpenFromSide";
import ProductContent from "./ProductContent";
import { useAppSelector } from "../../../../hooks/redux";
import { selectedProduct } from "../../../../store/slices/Product/singleProductSlice";

const SingleProduct = () => {
  const { getParam, deleteParam } = useURLState();
  const product = useAppSelector(selectedProduct);
  const id = getParam("productId");

  return (
    <OpenFromSide
      isOpen={Boolean(id && product)}
      onClose={() => deleteParam("productId")}>
      {product ? <ProductContent product={product} /> : null}
    </OpenFromSide>
  );
};

export default React.memo(SingleProduct);
