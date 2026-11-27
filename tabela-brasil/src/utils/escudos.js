const escudos = import.meta.glob('../assets/images/*.png', {
  eager: true,
  query: '?url',
  import: 'default'
})

export function carregarEscudo(nome) {
  const caminho = `../assets/images/${nome}`
  return escudos[caminho] || new URL('../assets/images/' + nome, import.meta.url).href
}
