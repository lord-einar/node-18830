const fs = require('fs');


class Contenedor {

    constructor(file){
        this.file = file
        try {
            this.productos = JSON.parse(fs.readFileSync(`./${file}`, 'utf-8'))
        } catch (error) {
            if(error.errno === -4058){
                console.log('No existe el archivo')
                this.productos = []
            }
        }
    }

    getAll(){
        return this.productos
    }

    async save(producto){

        let indice;
        (this.productos.length > 0)
        ? indice = this.productos[this.productos.length -1].id + 1
        : indice = 1
        
        let agregarProducto = {...producto, ...{"id": indice}}

        this.productos.push(agregarProducto)

        try {
            await fs.promises.writeFile(`./${this.file}`, JSON.stringify(this.productos), 'utf-8')
            return agregarProducto
        } catch (error) {
            console.log(error)
        }
        
    }

    async getById(id){
        let producto = this.productos.find(p => p.id == id)
        return producto
    }

    async deleteById(id){
        let producto = this.productos.filter(p => p.id != id)
        
        try {
            await fs.promises.writeFile(`./${this.file}`, JSON.stringify(producto), 'utf-8')
            console.log('Producto eliminado')
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        this.productos = []
        try {
            await fs.promises.writeFile(`./${this.file}`, '', 'utf-8')
            console.log('Productos eliminados')
        } catch (error) {
            console.log(error)
        }
    }

}

// const prod = new Contenedor('productos.txt')

module.exports = Contenedor



// prod.getAll()

// prod.save({"title": "Lapicera", "precio": 1425, "thumbnail": "https://cdn2.iconfinder.com/data/icons/design-filled-outline/64/21-512.png"})

// prod.getById(2)

// prod.deleteById(1)

// prod.deleteAll()




// Ejemplo productos
// {"title": "Escuadra", "price": 123.45, "thumbnail": "https://cdn2.iconfinder.com/data/icons/draw-and-design/512/esquadra-2-512.png"}
// {"title": "Calculadora", "price": 234.56, "thumbnail": "https://cdn1.iconfinder.com/data/icons/ui-basic-18/32/calculator-512.png"}
// {"title": "Globo Terraqueo", "price": 345.67, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-2-1/512/geography_globe_earth_education-512.png"}