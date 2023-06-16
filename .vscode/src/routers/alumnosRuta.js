const express = require('express')
const { 
    alumnosController, 
    alumnoByDniController, 
    deleteAlumnoByDniController, 
    agregarAlumnoController, 
    actualizarAlumnoByDniController 
} = require('../controllers/alumnos.controller')

const router = express.Router()

router.get('/alumnos', alumnosController)
/*Paso el dni por path parameter */ 
router.get('/alumnos/:dni', alumnoByDniController)

router.delete('/alumnos/:dni', deleteAlumnoByDniController)

router.post('/alumnos', agregarAlumnoController )

router.put('/alumnos/:dni', actualizarAlumnoByDniController)

module.exports = { alumnosRuta: router }