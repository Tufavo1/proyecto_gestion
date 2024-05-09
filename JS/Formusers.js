document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerBtn").addEventListener("click", function (event) {
        event.preventDefault();
        var nombre = document.getElementById("nombre").value;
        var fechaNacimiento = document.getElementById("fechaNacimiento").value;
        var email = document.getElementById("registerEmail").value;
        var password = document.getElementById("registerPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        var usuario = {
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            email: email,
            password: password
        };

        var usuariosRegistrados = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];
        usuariosRegistrados.push(usuario);
        localStorage.setItem("UsuariosRegistrados", JSON.stringify(usuariosRegistrados));

        alert("Registro exitoso");
        document.getElementById("registerUser").reset();
    });

    document.getElementById("loginBtn").addEventListener("click", function (event) {
        event.preventDefault();
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;

        var usuariosRegistrados = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];
        var usuarioEncontrado = usuariosRegistrados.find(function (usuario) {
            return usuario.email === email && usuario.password === password;
        });

        if (usuarioEncontrado) {
            localStorage.setItem("UsuarioIniciado", JSON.stringify(usuarioEncontrado));
            alert("Inicio de sesión exitoso");
            window.location.href = "perfil.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos");
        }
    });
});