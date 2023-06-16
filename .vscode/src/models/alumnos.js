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

  const Alumno = mongoose.model('Alumno', alumnoSchema);
