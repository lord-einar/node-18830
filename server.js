const express = require('express')
const port = process.env.PORT || 8080
const app = express()
const random = require('random')
const Contenedor = require('./contenedor')

const prod = new Contenedor('productos.txt')
let productos = prod.getAll()

app.get('/productos', (req, res) => {
  res.send(productos)
})

app.get('/productorandom', (req, res) => {
    let id = random.int(0, productos.length -1)
    let producto = prod.getById(id)
    res.send(producto)

})

app.listen(port, () => {
  console.log(`Conectado en puerto: ${port}`)
})
