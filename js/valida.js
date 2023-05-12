function validateForm() {
    var nombre = document.forms["myForm"]["nombre"].value;
    var apellido = document.forms["myForm"]["apellido"].value;
    var telefono = document.forms["myForm"]["telefono"].value;
    var empresa = document.forms["myForm"]["empresa"].value;
    var correo = document.forms["myForm"]["correo"].value;

    if (!/^[a-zA-Z]+$/.test(nombre)) {
        alert("Por favor, ingrese un nombre válido sin números.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(apellido)) {
        alert("Por favor, ingrese un apellido válido sin números.");
        return false;
    }
    if (!/^\d+$/.test(telefono)) {
        alert("Por favor, ingrese un número de teléfono válido solo con números.");
        return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(empresa)) {
        alert("Por favor, ingrese una empresa válida solo con texto.");
        return false;
    }
    if (correo.indexOf("@") == -1) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
}