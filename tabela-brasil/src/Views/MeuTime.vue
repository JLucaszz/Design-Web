
<script setup>
import { useFavoritosStore } from '../stores/favoritosStore'

const favoritos = useFavoritosStore()

function escolherTime() {
  favoritos.selecionarTime(2)
}
</script>

<template>
  <main>
    <h1>Meu Time Favorito</h1>

    <button @click="escolherTime">
      Escolher meu time
    </button>
  </main>
</template>
