<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conexion = mysqli_connect("localhost", "root", "", "pagina_de_tatuajes");

$email = $_POST['email'];
$pass_usuario = $_POST['password'];

// 1. Buscamos si el usuario ya existe
$buscar = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = mysqli_query($conexion, $buscar);

if (mysqli_num_rows($resultado) > 0) {
    // EL USUARIO EXISTE -> Intentamos iniciar sesión
    $fila = mysqli_fetch_assoc($resultado);
    if (password_verify($pass_usuario, $fila['password_hash'])) {
        $_SESSION['usuario'] = $email;
        echo "<script>
                localStorage.setItem('usuarioLogueado', 'true');
                window.location.href = 'perfil.html';
              </script>";
    } else {
        echo "<h1>Contraseña incorrecta</h1><a href='login.html'>Volver</a>";
    }
} else {
    // EL USUARIO NO EXISTE -> Lo registramos
    $pass_fuerte = password_hash($pass_usuario, PASSWORD_BCRYPT);
    $registrar = "INSERT INTO usuarios (nombre_usuario, email, password_hash) 
                  VALUES ('$email', '$email', '$pass_fuerte')";
    
    if (mysqli_query($conexion, $registrar)) {
        echo "<script>
                localStorage.setItem('usuarioLogueado', 'true');
                alert('¡Cuenta creada! Bienvenido.');
                window.location.href = 'perfil.html';
              </script>";
    } else {
        echo "Error: " . mysqli_error($conexion);
    }
}
mysqli_close($conexion);
?>