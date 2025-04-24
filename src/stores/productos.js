import { defineStore } from 'pinia'
import pb from '../lib/pocketbase'

export const useProductosStore = defineStore('productos', {
  state: () => ({
    lista: [],
    cargando: false,
    error: null
  }),
  actions: {
    async cargarProductos() {
      this.cargando = true
      this.error = null
      try {
        const records = await pb.collection('productos').getFullList({
          sort: '-created'
        })

        this.lista = records.map((r) => ({
          ...r,
          imagen: pb.files.getURL(r, r.imagen)
        }))
      } catch (e) {
        console.error('Error al cargar productos:', e)
        this.error = 'No se pudieron cargar los productos'
      } finally {
        this.cargando = false
      }
    },
    async cargarProductoPorId(id) {
        this.cargando = true
        this.error = null
        try {
          const record = await pb.collection('productos').getOne(id)
          return {
            ...record,
            imagen: pb.files.getURL(record, record.imagen)
          }
        } catch (e) {
          console.error('Error al obtener producto:', e)
          this.error = 'No se pudo cargar el producto'
          return null
        } finally {
          this.cargando = false
        }
      }
  }
})
