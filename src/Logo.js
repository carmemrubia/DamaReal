import React from 'react';
import { View, Text } from 'react-native';
import { cores } from './tema';

// Logo desenhada: peca de dama rosa com coroa, sobre mini tabuleiro
export default function Logo({ tamanho = 130 }) {
  const casa = tamanho / 2;
  const peca = casa * 0.8;
  const quadrado = (escuro) => ({
    width: casa,
    height: casa,
    backgroundColor: escuro ? '#F06292' : '#FCE4EC',
    alignItems: 'center',
    justifyContent: 'center',
  });
  const bola = (cor, borda) => ({
    width: peca,
    height: peca,
    borderRadius: peca,
    backgroundColor: cor,
    borderWidth: 3,
    borderColor: borda,
    alignItems: 'center',
    justifyContent: 'center',
  });
  return (
    <View
      style={{
        width: tamanho + 12,
        height: tamanho + 12,
        borderWidth: 6,
        borderColor: cores.rosaEscuro,
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={quadrado(false)} />
        <View style={quadrado(true)}>
          <View style={bola('#FFFFFF', '#F8BBD0')} />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={quadrado(true)}>
          <View style={bola(cores.rosaForte, cores.rosaEscuro)}>
            <Text style={{ fontSize: peca * 0.55, color: '#FFD54F' }}>♛</Text>
          </View>
        </View>
        <View style={quadrado(false)} />
      </View>
    </View>
  );
}