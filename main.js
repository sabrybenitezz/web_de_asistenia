function validarFormulario() {
    var usuario = document.getElementById("username").value;
    var contrasena = document.getElementById("password").value;
  
    if (usuario == "" || contrasena == "") {
      var mensajeError = document.getElementById("mensajeError");
      mensajeError.innerHTML = "Por favor ingrese un usuario y una contraseña.";
      return false;
    }
  
    // Aquí podrías agregar más validaciones, como verificar si el usuario y la contraseña son válidos
  
    return true;
  }