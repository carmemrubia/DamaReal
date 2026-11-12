export const TAM = 8;

const DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

function dentro(r, c) {
  return r >= 0 && r < TAM && c >= 0 && c < TAM;
}

export function criarTabuleiro() {
  const tab = [];
  for (let r = 0; r < TAM; r++) {
    const linha = [];
    for (let c = 0; c < TAM; c++) {
      let casa = null;
      if ((r + c) % 2 === 1) {
        if (r < 3) casa = { j: 2, d: false };
        else if (r > 4) casa = { j: 1, d: false };
      }
      linha.push(casa);
    }
    tab.push(linha);
  }
  return tab;
}

// Anda em linha reta na diagonal ate achar uma peca ou o fim do tabuleiro
function percorrer(tab, r, c, dr, dc) {
  const vazias = [];
  let lr = r + dr;
  let lc = c + dc;
  for (; dentro(lr, lc); lr += dr, lc += dc) {
    if (tab[lr][lc]) {
      return { vazias: vazias, achou: [lr, lc] };
    }
    vazias.push([lr, lc]);
  }
  return { vazias: vazias, achou: null };
}

export function capturasDaPeca(tab, r, c) {
  const p = tab[r][c];
  const lista = [];
  if (!p) return lista;
  for (const [dr, dc] of DIRS) {
    if (p.d) {
      const ida = percorrer(tab, r, c, dr, dc);
      if (ida.achou && tab[ida.achou[0]][ida.achou[1]].j !== p.j) {
        const depois = percorrer(tab, ida.achou[0], ida.achou[1], dr, dc);
        for (const destino of depois.vazias) {
          lista.push({ de: [r, c], para: destino, captura: ida.achou });
        }
      }
    } else {
      const meioR = r + dr;
      const meioC = c + dc;
      const fimR = r + 2 * dr;
      const fimC = c + 2 * dc;
      if (dentro(fimR, fimC)) {
        const meio = tab[meioR][meioC];
        if (meio && meio.j !== p.j && !tab[fimR][fimC]) {
          lista.push({ de: [r, c], para: [fimR, fimC], captura: [meioR, meioC] });
        }
      }
    }
  }
  return lista;
}

export function simplesDaPeca(tab, r, c) {
  const p = tab[r][c];
  const lista = [];
  if (!p) return lista;
  for (const [dr, dc] of DIRS) {
    if (p.d) {
      const ida = percorrer(tab, r, c, dr, dc);
      for (const destino of ida.vazias) {
        lista.push({ de: [r, c], para: destino, captura: null });
      }
    } else {
      const frente = p.j === 1 ? -1 : 1;
      if (dr === frente) {
        const nr = r + dr;
        const nc = c + dc;
        if (dentro(nr, nc) && !tab[nr][nc]) {
          lista.push({ de: [r, c], para: [nr, nc], captura: null });
        }
      }
    }
  }
  return lista;
}

// Captura opcional: andar e capturar ficam liberados ao mesmo tempo
export function movimentosValidos(tab, j, travada) {
  if (travada) return capturasDaPeca(tab, travada[0], travada[1]);
  const caps = [];
  const simples = [];
  for (let r = 0; r < TAM; r++) {
    for (let c = 0; c < TAM; c++) {
      if (tab[r][c] && tab[r][c].j === j) {
        caps.push(...capturasDaPeca(tab, r, c));
        simples.push(...simplesDaPeca(tab, r, c));
      }
    }
  }
  return [...caps, ...simples];
}

export function aplicarMovimento(tab, mov) {
  const novo = tab.map((l) => l.slice());
  const de = mov.de;
  const para = mov.para;
  const peca = { ...novo[de[0]][de[1]] };
  novo[de[0]][de[1]] = null;
  novo[para[0]][para[1]] = peca;
  if (mov.captura) novo[mov.captura[0]][mov.captura[1]] = null;

  let continua = null;
  if (mov.captura && capturasDaPeca(novo, para[0], para[1]).length > 0) {
    continua = [para[0], para[1]];
  } else {
    const ultima = peca.j === 1 ? 0 : TAM - 1;
    if (!peca.d && para[0] === ultima) {
      novo[para[0]][para[1]] = { ...peca, d: true };
    }
  }
  return { tab: novo, continua: continua };
}

export function contarPecas(tab, j) {
  let n = 0;
  for (const linha of tab) {
    for (const casa of linha) {
      if (casa && casa.j === j) n++;
    }
  }
  return n;
}