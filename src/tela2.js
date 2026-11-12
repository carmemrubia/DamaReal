import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { cores, fontes } from './tema';

const regras = [
  'O jogo é para 2 jogadores, no mesmo aparelho.',
  'A Jogadora 1 começa. Toque na peça e depois na casa de destino.',
  'As peças andam 1 casa na diagonal, só para frente.',
  'Capturar é opcional. Você pode mover qualquer peça que quiser.',
  'Para capturar, pule sobre a peça do adversário (para frente ou para trás).',
  'Se der para capturar de novo com a mesma peça, a jogada continua.',
  'Ao chegar na última linha, a peça vira dama (♛) e anda quantas casas quiser na diagonal.',
  'Vence quem capturar todas as peças do adversário ou deixá-lo sem jogadas.',
  'Na tela do jogo, toque em Cores para trocar o tema do tabuleiro.',
];

export default function Tela2() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Como jogar</Text>
      {regras.map((r, i) => (
        <View key={i} style={styles.cartao}>
          <Text style={styles.numero}>{i + 1}</Text>
          <Text style={styles.texto}>{r}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: cores.fundo, alignItems: 'center' },
  titulo: {
    fontSize: 34,
    fontFamily: fontes.titulo,
    color: cores.rosaForte,
    marginBottom: 14,
  },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: cores.rosaClaro,
    padding: 12,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  numero: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: cores.rosa,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 34,
    fontFamily: fontes.titulo,
    fontSize: 18,
    marginRight: 12,
    overflow: 'hidden',
  },
  texto: { flex: 1, fontSize: 14, fontFamily: fontes.texto, color: cores.texto },
});