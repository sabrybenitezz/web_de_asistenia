const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/webasistencia', { useNewUrlParser: true })
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch(err => console.log('Error de conexión a la base de datos: ' + err));


  const mongoose = require('mongoose');

  const usuarioSchema = new mongoose.Schema({
   
    email: String,
    password: String
  });
  
  const admins = mongoose.model('admins', usuarioSchema);
  
  module.exports = admins;
   


  const mongoose = require('mongoose');
const Usuario = require('./usuario');

Usuario.find({})
  .then(usuarios => console.log('Usuarios encontrados: ' + usuarios))
  .catch(err => console.log('Error al buscar usuarios: ' + err));