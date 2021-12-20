const express = require('express')
const app = express()
const { Router } = express;
const port = process.env.PORT || 8080
const Contenedor = require('./contenedor')
const router = Router();

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())
app.use('/api/productos', router)


const prod = new Contenedor('productos.txt')
let productos = prod.getAll()

router.get('/', (req, res) => {
  res.send(productos)
})

router.get('/:id', (req, res) => {
  const {id}= req.params
  prod.getById(id).then(producto => {
    (producto) ? res.send(producto) : res.send({error: "Producto no encontrado"})
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const { title, price, thumbnail } = req.body
  const producto = {title, price, thumbnail}
  prod.save(producto).then(p => res.send(p))
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  if (!productos.find(d => d.id == id)) {
    res.send({error: "Producto no encontrado"})
    return
  }
    
  const { title, price, thumbnail } = req.body
  const producto = { title, price, thumbnail }
  for (let i = 0; i < productos.length; i++) {
    if(productos[i].id == id){
      productos[i].title = producto.title
      productos[i].price = producto.price
      productos[i].thumbnail = producto.thumbnail
    } 
  }
  prod.save(productos).then( res.send("Producto actualizado"))

})

router.delete('/:id', (req, res) => {
  const {id}= req.params
  if (!productos.find(d => d.id == id)) {
    res.send({error: "Producto no encontrado"})
    return
  }
  prod.deleteById(id).then(res.send("Producto eliminado"))
    
})

app.listen(port, () => {
  console.log(`Conectado en puerto: ${port}`)
})
