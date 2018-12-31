const formConnexion = document.getElementById("formulaireConnexion");
const username = document.getElementById("username");
const password = document.getElementById("password");

formConnexion.addEventListener("submit", function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let utilisateur = {
        "username": username.value,
        "password": password.value
    };

    let url = "http://localhost:8083/connexion/";

    jQuery.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(utilisateur),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        }
    });
});