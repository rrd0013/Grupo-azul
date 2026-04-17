<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1. Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "pagina_de_tatuajes");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// 2. Recibir datos del formulario de login
$email = $_POST['email'];
$pass_usuario = $_POST['password'];

// 3. Buscar al usuario en la base de datos
$consulta = "SELECT password_hash FROM usuarios WHERE email = '$email'";
$resultado = mysqli_query($conexion, $consulta);

if ($fila = mysqli_fetch_assoc($resultado)) {
    // 4. VERIFICAR LA CONTRASEÑA ENCRIPTADA
    if (password_verify($pass_usuario, $fila['password_hash'])) {
        // Si es correcta, iniciamos sesión y mandamos al perfil
        session_start();
        $_SESSION['usuario'] = $email;
        header("Location: perfil.html");
    } else {
        echo "<h1>Contraseña incorrecta</h1>";
        echo "<a href='login.html'>Volver a intentarlo</a>";
    }
} else {
    echo "<h1>El usuario no existe</h1>";
    echo "<a href='login.html'>Volver a intentarlo</a>";
}

mysqli_close($conexion);
?>