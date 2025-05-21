import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual



// Creación del servidor HTTP
const server = createServer((req, res) => {
  const { method, url } = req

  // Manejo de solicitudes GET
  if (method === 'GET') {
    if (url === '/') {
      // TODO: Servir el archivo home.html desde la carpeta views
      const filePath = join(__dirname, 'views', 'home.html') 
      // 1. Usar readFile para leer el archivo 
      readFile(filePath, 'utf-8', (err,data) => { //Leo el archivo y lo sirvo.
        if(err){ //Especifico en caso de error
          res.writeHead(404,{'Content-Type':'text/plain'})
          res.end(`Error al leer archivo ${err}`)
        }else {
          // 2. Establecer el Content-Type correcto
          const ContentType = getContentType(filePath)
          // 3. Enviar el contenido al cliente
          res.writeHead(200, {'Content-Type': ContentType })
          res.end(data)
        }
      })
    
     

    } else if (url === '/login') {
      // TODO: Servir el archivo login.html desde la carpeta views
      const filePath = join(__dirname, 'views', 'login.html') 
      // 1. Usar readFile para leer el archivo
      readFile(filePath, 'utf-8', (err,data) => { //Leo el archivo y lo sirvo.
        if(err){ //Especifico en caso de error
          res.writeHead(404,{'Content-Type':'text/plain'})
          res.end(`Error al leer archivo ${err}`)
          
        }else {
          // 2. Establecer el Content-Type correcto
          const ContentType = getContentType(filePath)
          // 3. Enviar el contenido al cliente
          res.writeHead(200, {'Content-Type': ContentType })
          res.end(data)
        }
      })

    } else if (url === '/register') {
      // TODO: Servir el archivo login.html desde la carpeta views
      const filePath = join(__dirname, 'views', 'register.html') 
      // 1. Usar readFile para leer el archivo
      readFile(filePath, 'utf-8', (err,data) => { 
        if(err){ //Especifico en caso de error
          res.writeHead(200, {'Content-Type': getContentType(filePath)})
          res.end(`Error al leer archivo ${err}`)
          
        }else {
          // 2. Establecer el Content-Type correcto
          res.writeHead(200, {'Content-Type': getContentType(filePath)})
          // 3. Enviar el contenido al cliente
          res.end(data)
        }
      })

    } else {
      // TODO: Servir archivos estáticos desde la carpeta public (imágenes y CSS)
      // 1. Usar join para construir la ruta del archivo
        const filePath = join(__dirname, 'public', url) 
        // 2. Usar readFile para leer el archivo
        readFile(filePath, 'utf-8', (err,data) => { 
          if(err){ //Especifico en caso de error
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end(`Error al leer archivo ${err}`)
            }else {
            // 3. Establecer el Content-Type usando getContentType
              res.writeHead(200, {'Content-Type': getContentType(filePath)})
            // 4. Enviar el contenido al cliente
              res.end(data)
              }
            })
 
    }
  }
  // Manejo de solicitudes POST
  else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // 1. Establecer el código de estado 302
      // 2. Establecer el header Location: '/'
      res.writeHead(302, { Location: '/' })
      // 3. Finalizar la respuesta
      res.end()
    } else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404)
      res.end('Ruta no encontrada')
    }
  }
})

// Configuración del puerto del servidor
const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})
