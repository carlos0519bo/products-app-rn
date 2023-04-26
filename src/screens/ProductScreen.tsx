import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { ProductsContext } from '../context/ProductsContext';
import { Cam } from '../components/Camera';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route, navigation }: Props) => {
  const [imageTemp, setImageTemp] = useState(null);
  const { id = '', name = '' } = route.params;
  const { categories } = useCategories();
  const [openCam, setOpenCam] = useState(false);
  const { loadProductsByid, addProduct, updateProduct } =
    useContext(ProductsContext);

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } =
    useForm({
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    });

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Nuevo producto',
    });
  }, []);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductsByid(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      {openCam ? (
        <Cam
          image={imageTemp!}
          setImageTemp={setImageTemp}
          setOpenCam={setOpenCam}
          id={_id}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            placeholder="Ingrese nombre del producto"
            style={styles.textInput}
            value={nombre}
            onChangeText={(value) => onChange(value, 'nombre')}
          />
          <Text style={styles.label}>Categoria:</Text>
          <Picker
            selectedValue={categoriaId}
            onValueChange={(value) => onChange(value, 'categoriaId')}
          >
            {categories.map((category) => (
              <Picker.Item
                label={category.nombre}
                value={category._id}
                key={category._id}
              />
            ))}
          </Picker>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={saveOrUpdate}
          >
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>

          {_id.length > 0 && (
            <View style={styles.containerButtons}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.button, width: 120 }}
                onPress={() => setOpenCam(true)}
              >
                <Text style={styles.textButton}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.button, width: 120 }}
              >
                <Text style={styles.textButton}>Galeria</Text>
              </TouchableOpacity>
            </View>
          )}

          {img.length > 0 && !imageTemp && (
            <Image
              source={{ uri: img }}
              style={{
                width: '100%',
                height: 300,
              }}
            />
          )}
          {/* //TODO: Mostrar imagen temporal */}
          {imageTemp && (
            <Image
              source={{ uri: imageTemp }}
              style={{
                width: '100%',
                height: 300,
                marginTop: 30,
                marginBottom: 30,
              }}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    height: 45,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  select: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
  },
});
