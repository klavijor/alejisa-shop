<template>
    <router-link :to="`/producto/${producto.id}`" class="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <img
        :src="producto.imagen"
        :alt="producto.nombre"
        class="rounded-lg mb-3 w-full h-40 object-cover"
      />
      <h2 class="text-lg font-semibold">{{ producto.nombre }}</h2>
      <p class="text-xs uppercase text-gray-400 mt-1 mb-2 tracking-wide">{{ producto.categoria }}</p>
      <p class="text-gray-600 text-sm flex-grow">{{ producto.descripcion }}</p>
      <p class="text-sm mt-2 text-gray-600">
        <span>Tallas:</span> {{ producto.talla.join(', ') }}
      </p>
      <p class="text-indigo-600 font-bold mt-2 text-lg">$ {{ producto.precio.toLocaleString() }}</p>
    </router-link>
  </template>
  
  <script setup>
  defineProps({
    producto: Object
  })
  </script>
  