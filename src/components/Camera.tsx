import { useContext, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ProductsContext } from '../context/ProductsContext';

interface Props {
  setImageTemp: React.Dispatch<React.SetStateAction<null>>;
  setOpenCam: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  id: string;
}

export const Cam = ({ setImageTemp, image, setOpenCam, id }: Props) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef: any = useRef(null);
  const { uploadImage } = useContext(ProductsContext);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          Necesitamos tu permiso para mostrar la cámara.
        </Text>
        <Button onPress={requestPermission} title="Conceder permisos" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        setImageTemp(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Imagen guardada');
        uploadImage(image, id);
        setOpenCam(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={FlashMode.off}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>capturar</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.camera}>
          <Image source={{ uri: image }} style={styles.camera} />
          <TouchableOpacity
            style={{ ...styles.saveButton, right: 30 }}
            onPress={saveImage}
          >
            <Text style={styles.text}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.saveButton, left: 30 }}
            onPress={() => setImageTemp(null)}
          >
            <Text style={styles.text}>Otra vez</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4);',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8);',
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
  },
});
