import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigation/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductsProvider>
          <Navigator />
        </ProductsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
