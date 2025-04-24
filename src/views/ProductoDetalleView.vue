<template>
  <div class="p-6 max-w-2xl mx-auto" v-if="producto">
    <img :src="producto.imagen" :alt="producto.nombre" class="w-full h-60 object-cover rounded-lg mb-4" />

    <h1 class="text-2xl font-bold">{{ producto.nombre }}</h1>
    <p class="text-sm uppercase text-gray-400 mt-1">{{ producto.categoria }}</p>
    <p class="text-gray-700 my-4">{{ producto.descripcion }}</p>
    <p class="font-semibold text-lg text-indigo-600 mb-4">
      $ {{ producto.precio.toLocaleString('es-CO') }}
    </p>

    <label class="block mb-2 font-medium">Selecciona una talla:</label>
    <select v-model="tallaSeleccionada" class="border rounded px-3 py-2 w-full mb-4">
      <option disabled value="">-- Selecciona --</option>
      <option v-for="t in producto.talla" :key="t" :value="t">{{ t }}</option>
    </select>

    <button
      @click="agregarAlCarrito"
      class="bg-indigo-600 text-white w-full px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
      :disabled="!tallaSeleccionada"
    >
      🛒 Agregar al carrito
    </button>

    <div class="mt-4 text-center">
      <button @click="volver" class="text-sm text-indigo-600 cursor-pointer">Volver</button>
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-500">
    Cargando producto...
  </div>

  <BotonCarrito />
</template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import { useCarritoStore } from '../stores/carrito'
  import { useProductosStore } from '../stores/productos'
  import BotonCarrito from '../components/BotonCarrito.vue'
  import { toast } from 'vue-sonner'
  
  const route = useRoute()
  const router = useRouter()
  const carrito = useCarritoStore()
  const productosStore = useProductosStore()
  
  const producto = ref(null)
  const tallaSeleccionada = ref('')
  
  async function cargarProducto() {
    const id = route.params.id
    const p = await productosStore.cargarProductoPorId(id)
    if (!p) {
      router.replace('/')
    } else {
      producto.value = p
    }
  }
  
  onMounted(() => {
    cargarProducto()
  })
  
  function agregarAlCarrito() {
    carrito.agregarProducto({ ...producto.value, talla: tallaSeleccionada.value })
    toast.success(`${producto.value.nombre} (${tallaSeleccionada.value}) agregado al carrito 🛍`)
    tallaSeleccionada.value = ''
  }
  
  function volver() {
    router.back()
  }
  </script>
  