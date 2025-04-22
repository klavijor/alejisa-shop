import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarritoView from '../views/CarritoView.vue'
import ProductoDetalleView from '../views/ProductoDetalleView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/carrito', name: 'Carrito', component: CarritoView },
    { path: '/producto/:id', name: 'ProductoDetalle', component: ProductoDetalleView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
