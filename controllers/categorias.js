const { response } = require('express')
const { Categoria } = require('../models')
const categoria = require('../models/categoria')

//ObtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query ) 
            .populate('usuario', 'name')
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ])

    res.json({
        total,
        categorias 
    })

}
//ObtenerCategoria - populate {}
const obtenerCategoria = async( req, res = response ) => {

    const { id } = req.params
    const categoria = await Categoria.findById( id ).populate('usuario', 'name')

    res.json( categoria )

} 
//ActualizarCaregoria -
const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
    res.json( categoria )
}
//BorrarCategoria - estado:false
const borrarCategoria = async(req, res = response) => {

    const { id } = req.params
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false }, { new: true })

    res.json( categoriaBorrada )
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Guardar los datos
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )

    //Guardar en DB
    await categoria.save()

    res.status(201).json(categoria)
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}