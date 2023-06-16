const alumnoSchema = require('../models/alumnos');
const { response, json } = require('express')
const alumnos = require('../models/alumnos.json')

const alumnosController =  ( _ , res )=>{
    res.status(200).json( alumnos )
}

const alumnoByDniController = ( req, res) => {
    const dni = req.params.dni
    const alumno = alumnos.find( a => a.dni == dni)
    if(alumno)
        res.status(200).json(alumno)
    else 
        res.status(404).json({mensaje : `El alumno con dni ${dni} no existe`})
}

const deleteAlumnoByDniController  = ( req, res) => {
    const dni = req.params.dni
    const indice = alumnos.findIndex( a => a.dni == dni)
    if(indice >= 0) {
        alumnos.splice(indice, 1)
        res.status(200).json({mensaje: `El alumno con dni ${dni} fue borrado exitosamente`})
    } else 
        res.status(404).json({mensaje : `El alumno con dni ${dni} no existe.`})
}

const agregarAlumnoController =  (req, res) => {
    const alumno = req.body
    const alumnoexiste = alumnos.find( a => a.dni == alumno.dni)
    if (alumnoexiste) {
        res.status(400).json({mensaje: `El alumno con dni ${alumno.dni} ya existe en la base de datos`})
    } else 
    {
        alumno.libreta = false
        alumnos.push(alumno)
        res.status(201).json(
            {mensaje: "El alumno se creo correctamente",
            alumno: alumnos[alumnos.length -1]
        })
    }
}

const actualizarAlumnoByDniController = (req, res)=> {
    const dni = req.params.dni
    const indice = alumnos.findIndex( a => a.dni == dni)
    if(indice >=0 ) {
        datos = req.body
        alumnos[indice].nombre = datos.nombre
        alumnos[indice].libreta = datos.libreta
        if(datos.domicilio?.calle)
            alumnos[indice].domicilio.calle = datos.domicilio.calle
    
        res.status(200).json({
            mensaje: `El alumno con dni ${dni} fue modicado exitosamente`,
            alumno: alumnos[indice]
        })
    } else 
    {
        res.status(404).json({mensaje : `El alumno con dni ${dni} no existe.`})
    }
}





module.exports = { 
    alumnosController, 
    alumnoByDniController, 
    deleteAlumnoByDniController, 
    agregarAlumnoController,
    actualizarAlumnoByDniController
}