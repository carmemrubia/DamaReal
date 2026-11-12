import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, fontes, temas } from './tema';
import {
  criarTabuleiro,
  movimentosValidos,
  aplicarMovimento,
  contarPecas,
} from './jogo';

export default function Tela3() {
  const { width } = useWindowDimensions();
  const lado = Math.min(width - 40, 430);
  const casa = lado / 8;

  const [temaIdx, setTemaIdx] = useState(0);
  const tema = temas[temaIdx];

  const [tab, setTab] = useState(criarTabuleiro());
  const [vez, setVez] = useState(1);
  const [sel, setSel] = useState(null);
  const [travada, setTravada] = useState(null);
  const [vencedor, setVencedor] = useState(null);
  const [tempo, setTempo] = useState(0);
  const [pontos, setPontos] = useState({ 1: 0, 2: 0 });

  useEffect(() => {
    if (vencedor) return;
    const id = setInterval(() => setTempo((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [vencedor]);

  // Captura opcional: todas as jogadas (andar ou capturar) ficam liberadas
  const movs = movimentosValidos(tab, vez, travada);
  const destinos = sel
    ? movs.filter((m) => m.de[0] === sel[0] && m.de[1] === sel[1])
    : [];

  function jogar(mov) {
    const res = aplicarMovimento(tab, mov);
    setTab(res.tab);
    if (mov.captura) setPontos((p) => ({ ...p, [vez]: p[vez] + 1 }));
    if (res.continua) {
      setTravada(res.continua);
      setSel(res.continua);
      return;
    }
    const prox = vez === 1 ? 2 : 1;
    setTravada(null);
    setSel(null);
    setVez(prox);
    if (movimentosValidos(res.tab, prox, null).length === 0) setVencedor(vez);
  }

  function tocar(r, c) {
    if (vencedor) return;
    const mov = destinos.find((m) => m.para[0] === r && m.para[1] === c);
    if (mov) {
      jogar(mov);
      return;
    }
    const peca = tab[r][c];
    if (peca && peca.j === vez && !travada) {
      const temJogada = movs.some((m) => m.de[0] === r && m.de[1] === c);
      setSel(temJogada ? [r, c] : null);
    }
  }

  function reiniciar() {
    setTab(criarTabuleiro());
    setVez(1);
    setSel(null);
    setTravada(null);
    setVencedor(null);
    setTempo(0);
    setPontos({ 1: 0, 2: 0 });
  }

  const mm = String(Math.floor(tempo / 60)).padStart(2, '0');
  const ss = String(tempo % 60).padStart(2, '0');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.placar}>
        <View style={styles.placarItem}>
          <Text style={styles.placarRotulo}>Jogadora 1</Text>
          <Text style={styles.placarValor}>
            {pontos[1]} capt. | {contarPecas(tab, 1)} peças
          </Text>
        </View>
        <View style={styles.placarItem}>
          <Ionicons name="time" size={20} color={cores.rosa} />
          <Text style={styles.tempo}>{mm}:{ss}</Text>
        </View>
        <View style={styles.placarItem}>
          <Text style={styles.placarRotulo}>Jogadora 2</Text>
          <Text style={styles.placarValor}>
            {pontos[2]} capt. | {contarPecas(tab, 2)} peças
          </Text>
        </View>
      </View>

      <View style={styles.vezBox}>
        <View
          style={[
            styles.bolinha,
            { backgroundColor: vez === 1 ? tema.peca1 : tema.peca2 },
          ]}
        />
        <Text style={styles.vez}>
          {vencedor
            ? 'Vitória da Jogadora ' + vencedor + '!'
            : 'Vez da Jogadora ' + vez + (travada ? ' (continue capturando)' : '')}
        </Text>
      </View>

      <View style={styles.moldura}>
        <View style={{ width: lado, height: lado }}>
          {tab.map((linha, r) => (
            <View key={r} style={{ flexDirection: 'row' }}>
              {linha.map((p, c) => {
                const escura = (r + c) % 2 === 1;
                const selecionada = sel && sel[0] === r && sel[1] === c;
                const ehDestino = destinos.some(
                  (m) => m.para[0] === r && m.para[1] === c
                );
                return (
                  <TouchableOpacity
                    key={c}
                    activeOpacity={0.8}
                    onPress={() => tocar(r, c)}
                    style={{
                      width: casa,
                      height: casa,
                      backgroundColor: escura ? tema.escura : tema.clara,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: selecionada ? 3 : 0,
                      borderColor: '#FFD54F',
                    }}
                  >
                    {p && (
                      <View
                        style={{
                          width: casa * 0.78,
                          height: casa * 0.78,
                          borderRadius: casa,
                          backgroundColor: p.j === 1 ? tema.peca1 : tema.peca2,
                          borderWidth: 2,
                          borderColor: 'rgba(136,14,79,0.45)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {p.d && (
                          <Text
                            style={{
                              fontSize: casa * 0.45,
                              color: p.j === 1 ? tema.coroa1 : tema.coroa2,
                            }}
                          >
                            ♛
                          </Text>
                        )}
                      </View>
                    )}
                    {!p && ehDestino && (
                      <View
                        style={{
                          width: casa * 0.3,
                          height: casa * 0.3,
                          borderRadius: casa,
                          backgroundColor: 'rgba(255,213,79,0.95)',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.acao}
          activeOpacity={0.8}
          onPress={() => setTemaIdx((temaIdx + 1) % temas.length)}
        >
          <Ionicons name="color-palette" size={24} color="#fff" />
          <Text style={styles.acaoTexto}>Cores: {tema.nome}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acao, { backgroundColor: cores.rosaEscuro }]}
          activeOpacity={0.8}
          onPress={reiniciar}
        >
          <Ionicons name="refresh" size={24} color="#fff" />
          <Text style={styles.acaoTexto}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: cores.fundo, alignItems: 'center' },
  placar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: cores.rosaClaro,
    padding: 10,
  },
  placarItem: { alignItems: 'center', flex: 1 },
  placarRotulo: { fontSize: 13, fontFamily: fontes.negrito, color: cores.rosaForte },
  placarValor: { fontSize: 11, fontFamily: fontes.texto, color: cores.texto },
  tempo: { fontSize: 20, fontFamily: fontes.titulo, color: cores.rosaForte },
  vezBox: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  bolinha: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: cores.rosaEscuro,
    marginRight: 8,
  },
  vez: { fontSize: 22, fontFamily: fontes.titulo, color: cores.rosaForte },
  moldura: {
    borderWidth: 6,
    borderColor: cores.rosaEscuro,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  acoes: { flexDirection: 'row' },
  acao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.rosa,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    marginHorizontal: 6,
  },
  acaoTexto: { color: '#fff', fontFamily: fontes.negrito, fontSize: 12, marginLeft: 6 },
});