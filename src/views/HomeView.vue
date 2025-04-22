<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">🎈 Alejisa Shop</h1>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ProductoCard
          v-for="producto in productos"
          :key="producto.id"
          :producto="producto"
          @agregar="agregarAlCarrito"
        />
      </div>
    </div>
  
    <!-- Botón flotante para ver el carrito -->
    <BotonCarrito />

  </template>
  
  <script setup>
  import productos from '../data/productos'
  import ProductoCard from '../components/ProductoCard.vue'
  import BotonCarrito from '../components/BotonCarrito.vue'
  import { useCarritoStore } from '../stores/carrito'
  import { toast } from 'vue-sonner'
  
  const carrito = useCarritoStore()
  
  function agregarAlCarrito(producto) {
    carrito.agregarProducto(producto)
    toast.success(`${producto.nombre} agregado al carrito 🛒`)
  }
  </script>
  