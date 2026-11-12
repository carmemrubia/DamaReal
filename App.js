import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { Cinzel_600SemiBold, Cinzel_700Bold } from '@expo-google-fonts/cinzel';
import Tela1 from './src/tela1';
import Tela2 from './src/tela2';
import Tela3 from './src/tela3';
import Tela4 from './src/tela4';
import { cores } from './src/tema';

const Tab = createBottomTabNavigator();

const icones = {
  'Boas-vindas': 'home',
  'Instruções': 'book',
  'Jogo': 'game-controller',
  'Créditos': 'heart',
};

function Rotas() {
  // Espaco dos botoes do celular (Android) e da barra do iPhone
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Boas-vindas"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: cores.rosa },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'MedievalSharp_400Regular', fontSize: 22 },
          tabBarActiveTintColor: cores.rosa,
          tabBarInactiveTintColor: '#C9A0B4',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopColor: cores.rosaClaro,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom + 6,
            paddingTop: 6,
          },
          tabBarLabelStyle: { fontFamily: 'Cinzel_700Bold', fontSize: 10 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icones[route.name]} size={size + 2} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Boas-vindas" component={Tela1} />
        <Tab.Screen name="Instruções" component={Tela2} />
        <Tab.Screen name="Jogo" component={Tela3} />
        <Tab.Screen name="Créditos" component={Tela4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [carregou] = useFonts({
    MedievalSharp_400Regular,
    Cinzel_600SemiBold,
    Cinzel_700Bold,
  });

  if (!carregou) return null;

  return (
    <SafeAreaProvider>
      <Rotas />
    </SafeAreaProvider>
  );
}