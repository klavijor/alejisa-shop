<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">🎈 Alejisa Shop</h1>

    <!-- Mensaje mientras carga -->
    <p v-if="productosStore.cargando" class="text-gray-500">Cargando productos...</p>

    <!-- Mensaje de error -->
    <p v-if="productosStore.error" class="text-red-500">{{ productosStore.error }}</p>

    <!-- Lista de productos -->
    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
import { onMounted, computed } from 'vue'
import ProductoCard from '../components/ProductoCard.vue'
import BotonCarrito from '../components/BotonCarrito.vue'
import { useCarritoStore } from '../stores/carrito'
import { useProductosStore } from '../stores/productos'
import { toast } from 'vue-sonner'

// Stores
const carrito = useCarritoStore()
const productosStore = useProductosStore()

// Computed para obtener lista desde la store
const productos = computed(() => productosStore.lista)

// Al montar la vista, carga los productos
onMounted(() => {
  productosStore.cargarProductos()
})

function agregarAlCarrito(producto) {
  carrito.agregarProducto(producto)
  toast.success(`${producto.nombre} agregado al carrito 🛒`)
}
</script>
