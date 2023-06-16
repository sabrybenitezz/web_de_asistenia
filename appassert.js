// Importar las bibliotecas necesarias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Crear una instancia de la aplicación
const app = express();

// Configurar el middleware
app.use(bodyParser.json());

// Configurar la conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/alumnos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crear un esquema para los estudiantes
const alumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  grado: String,
  turno: String,
  padre: String,
  dni: String,
  direccion: String,
  email: String,
  asistencias: [
    {
      fecha: Date,
      presente: Boolean,
    },
  ],
});

// Crear un modelo para los estudiantes
const Alumno = mongoose.model('Alumno', alumnoSchema);

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tucorreo@gmail.com',
    pass: 'tupassword',
  },
});

// Configurar las rutas de la aplicación
app.post('/registro', async (req, res) => {
  try {
    // Crear un nuevo estudiante
    const alumno = new Alumno({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      grado: req.body.grado,
      turno: req.body.turno,
      padre: req.body.padre,
      dni: req.body.dni,
      direccion: req.body.direccion,
      email: req.body.email,
    });

    // Guardar el estudiante en la base de datos
    await alumno.save();

    // Enviar una respuesta exitosa
    res.status(200).send('Estudiante registrado con éxito.');
  } catch (error) {
    // Enviar una respuesta de error
    res.status(500).send(error);
  }
});

app.get('/historial/:dni', async (req, res) => {
  try{
    // Obtener la información del estudiante
    const estudiante = await Estudiante.findOne({ _id: req.query.id });

    // Obtener el rango de fechas
    const fechaInicio = moment(req.query.fechaInicio, 'YYYY-MM-DD');
    const fechaFin = moment(req.query.fechaFin, 'YYYY-MM-DD');

    // Obtener las asistencias del estudiante en el rango de fechas
    const asistencias = await Asistencia.find({
      estudiante: estudiante._id,
      fecha: {
        $gte: fechaInicio.toDate(),
        $lte: fechaFin.toDate(),
      },
    });

    // Renderizar la página web con la información del historial de asistencia
    res.render('historial', {
      estudiante,
      fechaInicio: fechaInicio.format('DD/MM/YYYY'),
      fechaFin: fechaFin.format('DD/MM/YYYY'),
      asistencias,
    });
  } catch (error) {
    console.error(error);
    res.send('Error al obtener el historial de asistencia');
  }
});
 
// Página web para iniciar sesión o registrarse
app.get('/login', (req, res) => {
  res.render('login');
});

// Endpoint para iniciar sesión
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Endpoint para registrarse
app.post('/registrarse', async (req, res) => {
  try {
    // Validar los datos ingresados por el usuario
    const { nombre, dni, apellido, email, usuario, contrasenia, hijo } = req.body;
    if (!nombre || !dni || !apellido || !email || !usuario || !contrasenia || !hijo) {
      throw new Error('Faltan datos obligatorios');
    }

    // Crear un nuevo usuario en la base de datos
    const usuarioNuevo = new Usuario({
      nombre,
      dni,
      apellido,
      email,
      usuario,
      contrasenia,
      hijo,
    });
    await usuarioNuevo.save();

    // Iniciar sesión con el nuevo usuario
    req.login(usuarioNuevo, (error) => {
      if (error) {
        throw error;
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.render('login', {
      mensaje: 'Ha ocurrido un error al registrar el usuario',
    });
  }
});

// Crear un esquema para los padres
const padreSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: String,
    email: String,
    usuario: String,
    contrasenia: String,
  });
  
  // Crear un modelo para los padres
  const Padre = mongoose.model('Padre', padreSchema);
  
  // Configurar las rutas de la aplicación
  app.post('/admin/registro', async (req, res) => {
    try {
      // Crear un nuevo padre
      const padre = new Padre({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        email: req.body.email,
        usuario: req.body.usuario,
        contrasenia: req.body.contrasenia,
      });
  
      // Guardar el padre en la base de datos
      await padre.save();
  
      // Enviar una respuesta exitosa
      res.status(200).send('Padre registrado con éxito.');
    } catch (error) {
      // Enviar una respuesta de error
      res.status(500).send(error);
    }
  });
  
  app.get('/admin/cuentas', async (req, res) => {
    try {
      // Obtener una lista de todas las cuentas de usuario de los padres
      const padres = await Padre.find();
  
      // Renderizar la tabla de cuentas de usuario de los padres
      res.render('admin/cuentas', { padres });
    } catch (error) {
      // Enviar una respuesta de error
      res.status(500).send(error);
    }
  });
  
  app.get('/admin/editar/:id', async (req, res) => {
    try {
      // Obtener el padre a editar
      const padre = await Padre.findById(req.params.id);
  
      // Renderizar el formulario de edición del padre
      res.render('admin/editar', { padre });
    } catch (error) {
      // Enviar una respuesta de error
      res.status(500).send(error);
    }
  });
  
  app.post('/admin/editar/:id', async (req, res) => {
    try {
      // Actualizar el padre
      await Padre.findByIdAndUpdate(req.params.id, {
        nombre: res.body.nombre,
        apellido: res.body.apellido,
        dni: res.body.dni,
        email: res.body.email,
        usuario: res.body.usuario,
        contrasenia: res.body.contrasenia,
      });
        }
                                                    }




                                                