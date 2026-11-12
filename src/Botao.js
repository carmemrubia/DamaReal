import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { cores, fontes } from './tema';

export default function Botao({ titulo, onPress, cor = cores.rosa }) {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: cor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginVertical: 8,
    minWidth: 230,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#880E4F',
  },
  texto: { color: '#fff', fontSize: 20, fontFamily: fontes.titulo },
});