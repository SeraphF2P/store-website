import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type AnimationContextType = {
  productInfo: ProductType | undefined;
  openProductInfoModal: (val: ProductType | undefined) => void;
};

const AnimationContext = createContext<AnimationContextType>({
  productInfo: undefined,
  openProductInfoModal: () => {},
});

export function useAnimationContext() {
  return useContext(AnimationContext);
}

const ProductInfoContext: FC<PropsWithChildren> = (props) => {
  const [productInfo, setProductInfo] = useState<ProductType | undefined>();

  const openProductInfoModal = (val: ProductType | undefined) => {
    if (productInfo) {
      setProductInfo(undefined);
    } else {
      setProductInfo(val);
    }
  };

  return (
    <AnimationContext.Provider value={{ productInfo, openProductInfoModal }}>
      {props.children}
    </AnimationContext.Provider>
  );
};

export default ProductInfoContext;
