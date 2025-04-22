import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    productos: []
  }),
  actions: {
    agregarProducto(producto) {
        const encontrado = this.productos.find(p => p.id === producto.id && p.talla === producto.talla)
        if (encontrado) {
          encontrado.cantidad++
        } else {
          this.productos.push({ ...producto, cantidad: 1 })
        }
      },
      
      eliminarProducto(producto) {
        const index = this.productos.findIndex(p => p.id === producto.id && p.talla === producto.talla)
        if (index !== -1) {
          if (this.productos[index].cantidad > 1) {
            this.productos[index].cantidad--
          } else {
            this.productos.splice(index, 1)
          }
          this.productos = [...this.productos] // 👈 para asegurar reactividad
        }
      },
              
    vaciarCarrito() {
      this.productos = []
    }
  },
  getters: {
    total: (state) =>
      state.productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0),
    totalItems: (state) =>
      state.productos.reduce((suma, p) => suma + p.cantidad, 0)
  }
})
