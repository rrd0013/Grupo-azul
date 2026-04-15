<?php
// 1. Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "pagina_de_tatuajes");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// 2. Recibir datos del formulario
// IMPORTANTE: Los nombres 'username', 'email' y 'password' deben coincidir con tu HTML
$user  = $_POST['username'];
$email = $_POST['email'];
$pass  = $_POST['password'];

// 3. ENCRIPTACIÓN (Hashing)
// Esto convierte "12345" en un código indescifrable
$pass_fuerte = password_hash($pass, PASSWORD_BCRYPT);

// 4. Insertar en la tabla 'usuarios' que creamos antes
$sql = "INSERT INTO usuarios (nombre_usuario, email, password_hash) 
        VALUES ('$user', '$email', '$pass_fuerte')";

if (mysqli_query($conexion, $sql)) {
    echo "<h1>¡Registro exitoso!</h1>";
    echo "<p>La cuenta se ha creado y la contraseña se ha encriptado correctamente.</p>";
    echo "<a href='index.html'>Volver a la página principal</a>";
} else {
    echo "Error al registrar: " . mysqli_error($conexion);
}

mysqli_close($conexion);
?>