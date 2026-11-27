# Tabela Brasil

Simulador de campeonato de pontos corridos feito com Vue 3, Vite, Pinia e Vue Router. Edite os placares das 30 partidas e acompanhe a classificação, estatísticas e desempenho do seu time favorito em tempo real. Os resultados e o clube favorito ficam salvos no `localStorage` do navegador.

## Executar localmente

```sh
npm install
npm run dev
```

Para gerar e pré-visualizar a versão de produção:

```sh
npm run build
npm run preview
```

## Páginas

- `/` — classificação e controles para favoritar um clube ou reiniciar os placares.
- `/rodadas` — placares editáveis do turno e returno.
- `/estatisticas` — líder, melhor ataque, defesa, saldo e média de gols.
- `/favoritos` — campanha e histórico do clube escolhido.
- `/sobre` — formato, pontuação e critérios de desempate.

## Estrutura principal

- `src/stores/rodadasStore.js` — clubes, confrontos e persistência dos resultados.
- `src/stores/tabelaStore.js` — classificação e totais derivados dos placares.
- `src/stores/favoritosStore.js` — clube favorito e persistência da escolha.
- `src/components/` — navegação, linha da tabela e cartão de partida reutilizáveis.
- `src/views/` — as cinco páginas do simulador.
- `src/assets/images/` — escudos PNG dos clubes.
