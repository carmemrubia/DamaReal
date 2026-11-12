import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Botao from './Botao';
import Logo from './Logo';
import { cores, fontes } from './tema';

export default function Tela1({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.titulo}>Dama Real</Text>
      <Text style={styles.sub}>Bem-vinda ao reino das damas</Text>
      <Botao titulo="Jogar" onPress={() => navigation.navigate('Jogo')} />
      <Botao
        titulo="Instruções"
        cor={cores.rosaForte}
        onPress={() => navigation.navigate('Instruções')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 44,
    fontFamily: fontes.titulo,
    color: cores.rosaForte,
    marginTop: 18,
  },
  sub: {
    fontSize: 15,
    fontFamily: fontes.texto,
    color: cores.texto,
    marginBottom: 26,
    textAlign: 'center',
  },
});