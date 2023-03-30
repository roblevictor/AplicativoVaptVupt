
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardapioScreen from './components/CardapioScreen';
import CarrinhoScreen from './components/CarrinhoScreen';
import VerProdutoScreen from './components/VerProdutoScreen';

import DataContext from './Context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <DataContext>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Cardápio') {
                return <Ionicons name='restaurant' size={size} color={color} />;
              } else if (route.name === 'Carrinho') {
                return <Ionicons name='ios-cart-sharp' size={size} color={color} />;
              }
            },
            tabBarInactiveTintColor: 'purple',
            tabBarActiveTintColor: 'dodgerblue',
          })}>
          <Tab.Screen name="Cardápio" component={CardapioScreen} />
          <Tab.Screen name="Carrinho" component={CarrinhoScreen} />
          <Tab.Screen name="VerProduto" component={VerProdutoScreen} options={{tabBarButton: () => null }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </DataContext>
  );
}
