<template>
    <router-link
      to="/carrito"
      class="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center w-14 h-14"
    >
      <span class="text-2xl">🛒</span>
      <span
        v-if="carrito.totalItems > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
      >
        {{ carrito.totalItems }}
      </span>
    </router-link>
  </template>
  
  <script setup>
  import { useCarritoStore } from '../stores/carrito'
  const carrito = useCarritoStore()
  </script>
  