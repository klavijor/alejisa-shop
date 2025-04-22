<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">🛒 Tu carrito</h1>
        <button @click="volver" class="inline-block text-sm text-indigo-600 cursor-pointer">
            Volver
        </button>
      </div>
  
      <div v-if="carrito.productos.length === 0">
        <p class="text-gray-500">Tu carrito está vacío.</p>
      </div>
  
      <div v-else>
        <ul>
          <li
            v-for="producto in carrito.productos"
            :key="producto.id"
            class="flex justify-between items-center border-b py-2"
          >
            <div>
              <p class="font-medium">{{ producto.nombre }}</p>
              <p class="text-xs text-gray-400">Talla: {{ producto.talla }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <button
                    @click="eliminarUno(producto)"
                    class="text-red-500 text-lg px-2 cursor-pointer"
                    title="Quitar uno"
                    >
                    ➖
                </button>
                <span class="text-sm text-gray-700">x{{ producto.cantidad }}</span>
                <button
                  @click="agregarUno(producto)"
                  class="text-green-600 text-lg px-2 cursor-pointer"
                  title="Agregar uno más"
                >
                  ➕
                </button>
              </div>
            </div>
            <p class="font-semibold text-right wrap-anywhere">
                ${{ (producto.precio * producto.cantidad).toLocaleString() }}
            </p>
          </li>
        </ul>
  
        <div class="mt-6">
          <p class="text-lg font-bold">Total: ${{ carrito.total.toLocaleString() }}</p>
          <button
            @click="enviarPorWhatsApp"
            class="mt-4 bg-green-600 text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-green-700"
          >
            Enviar pedido por WhatsApp
          </button>
          <div class="mt-4 text-center">
              <button
                @click="vaciar"
                class="text-sm text-red-500 cursor-pointer hover:underline"
              >
                Vaciar carrito
              </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCarritoStore } from '../stores/carrito'
  import { useRouter } from 'vue-router'
  import { toast } from 'vue-sonner'
  
  const router = useRouter()
  const carrito = useCarritoStore()

  function volver() {
    router.back()
  }
  
  function agregarUno(producto) {
    carrito.agregarProducto(producto)
    toast.success(`Agregaste otro ${producto.nombre} (Talla ${producto.talla})`)
  }
  
  function eliminarUno(producto) {
    carrito.eliminarProducto(producto)
    toast.error(`Quitaste una unidad de ${producto.nombre} (Talla ${producto.talla})`)
  }
  
  function vaciar() {
    carrito.vaciarCarrito()
    toast.warning('Se vació el carrito 🗑️')
  }
  
  function enviarPorWhatsApp() {
    if (carrito.productos.length === 0) return
  
    const mensaje = carrito.productos.map(p =>
        `${p.nombre} (Talla ${p.talla}) x${p.cantidad} = $${(p.precio * p.cantidad).toLocaleString()}`
    ).join('\n')

    const total = `\n\n Total: $${carrito.total.toLocaleString()}`
    const textoFinal = `Hola, quiero hacer este pedido:\n${mensaje}${total}`
    const numero = '573153408734'
  
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(textoFinal)}`
    window.open(url, '_blank')
  
    toast.success('Pedido enviado por WhatsApp ✅')
  }
  </script>
  