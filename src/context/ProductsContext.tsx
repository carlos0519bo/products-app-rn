import { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProducts: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductsByid: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO: cambiar el any
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...products, ...resp.data.productos]);
  };
  const addProducts = async (categoryId: string, productName: string) => {};
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string
  ) => {};
  const deleteProduct = async (id: string) => {};
  const loadProductsByid = (id: string) => {
    throw new Error('Not implemented');
  };
  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProducts,
        updateProduct,
        deleteProduct,
        loadProductsByid,
        uploadImage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
