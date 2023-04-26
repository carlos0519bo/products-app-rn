import { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';
import * as ImagePicker from 'expo-image-picker';
import { Asset, AssetInfo } from 'expo-media-library';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
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
    const resp = await cafeApi.get<ProductsResponse>('/productos');
    setProducts([...products, ...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });

    setProducts([...products, resp.data]);

    return resp.data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string
  ) => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });

    setProducts(
      products.map((prod) => {
        return prod._id === productId ? resp.data : prod;
      })
    );
  };
  const deleteProduct = async (id: string) => {
    console.log(id);
    const resp = await cafeApi.delete(`/productos/${id}`);
    return resp.data;
  };
  const loadProductsByid = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get(`/productos/${id}`);

    return resp.data;
  };
  const uploadImage = async (
    data: ImagePicker.ImagePickerAsset,
    id: string
  ) => {
    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload as any);

    try {
      const resp = await cafeApi.put(`/uploads/productos/${id}`, formData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
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
