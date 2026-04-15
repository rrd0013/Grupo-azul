<?php
session_start();
$conexion = mysqli_connect("localhost", "root", "", "pagina_de_tatuajes");

$email = $_POST['email'];
$pass  = $_POST['password'];

// Buscamos al usuario por su email
$consulta = "SELECT * FROM usuarios WHERE email = '$email'";
$resultado = mysqli_query($conexion, $consulta);

if (mysqli_num_rows($resultado) > 0) {
    $usuario = mysqli_fetch_assoc($resultado);
    
    // VERIFICACIÓN DE LA ENCRIPTACIÓN
    if (password_verify($pass, $usuario['password_hash'])) {
        $_SESSION['usuario'] = $usuario['nombre_usuario'];
        echo "¡Bienvenido, " . $usuario['nombre_usuario'] . "!";
        // Aquí podrías redirigir a la página principal: header("Location: index.html");
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "El correo no está registrado.";
}
?>