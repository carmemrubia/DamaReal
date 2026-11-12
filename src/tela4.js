import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo';
import { cores, fontes } from './tema';

export default function Tela4() {
  return (
    <View style={styles.container}>
      <Logo tamanho={90} />
      <Text style={styles.titulo}>Créditos</Text>
      <Text style={styles.texto}>Desenvolvido por: Carmem R T S</Text>
      <Text style={styles.texto}>FATEC Itaquera "Prof. Miguel Reale"</Text>
      <Text style={styles.texto}>Curso: Desenvolvimento de Software Multiplataforma</Text>
      <Text style={styles.texto}>Disciplina: Programação para Dispositivos Móveis II</Text>
      <View style={styles.caixa}>
        <Text style={styles.aviso}>
          Este site é um projeto acadêmico da FATEC, criado apenas para fins de estudo. Não utilize as informações aqui para uso real.
        </Text>
      </View>
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
    fontSize: 38,
    fontFamily: fontes.titulo,
    color: cores.rosaForte,
    marginVertical: 14,
  },
  texto: {
    fontSize: 16,
    fontFamily: fontes.texto,
    color: cores.texto,
    marginBottom: 8,
    textAlign: 'center',
  },
  caixa: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: cores.rosa,
    borderRadius: 14,
    padding: 14,
  },
  aviso: {
    fontSize: 14,
    fontFamily: fontes.texto,
    color: cores.rosaEscuro,
    textAlign: 'center',
  },
});