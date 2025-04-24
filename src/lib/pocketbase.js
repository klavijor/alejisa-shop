import PocketBase from 'pocketbase'

// Usa esta URL si estás en local
/* const pb = new PocketBase('http://127.0.0.1:8090') */
const pb = new PocketBase('https://backend-alejisa.onrender.com')

// Opcional: puedes activar logging de peticiones/respuestas
// pb.autoCancellation(false)

export default pb
