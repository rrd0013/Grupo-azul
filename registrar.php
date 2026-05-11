<?php
// Añade estas dos líneas aquí mismo:
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Luego sigue el resto de tu código...
// 1. Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "pagina_de_tatuajes");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// 2. Recibir datos del formulario
$email = $_POST['email'];
$pass  = $_POST['password'];

// 3. ENCRIPTACIÓN (Hashing)
$pass_fuerte = password_hash($pass, PASSWORD_BCRYPT);

// 4. Insertar en la tabla 'usuarios'
// Usamos el email también como 'nombre_usuario' para que no de error por falta de campos
$sql = "INSERT INTO usuarios (nombre_usuario, email, password_hash) 
        VALUES ('$email', '$email', '$pass_fuerte')";

if (mysqli_query($conexion, $sql)) {
    echo "<h1>¡Registro exitoso!</h1>";
    echo "<p>La cuenta se ha creado y la contraseña se ha encriptado correctamente.</p>";
    echo "<a href='login.html'>Ir al Login</a>";
} else {
    echo "Error al registrar: " . mysqli_error($conexion);
}

mysqli_close($conexion);
?>