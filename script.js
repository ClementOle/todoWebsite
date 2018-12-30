const urlApi = "http://localhost:8083";
const id = 26;

const tasksList = document.querySelector(".tasksList");
const newTask = document.getElementById("newTask");
const textTask = document.getElementById("text");

function getListTask(idUtilisateur) {
    let url = urlApi + "/" + idUtilisateur + "/tasks/?page=0";
    $.get(url, function (data) {
        afficheListTask(data.content);
    });
}

function afficheListTask(listeTache) {
    tasksList.innerHTML = "";
    for (let tache in listeTache) {
        let li = document.createElement("li");
        li.className = "task";
        tasksList.appendChild(li);
        let p = document.createElement("p");
        li.appendChild(p);
        p.classList.add("taskText");
        p.innerHTML = listeTache[tache].text;
    }
}


getListTask(id);


newTask.addEventListener("submit", function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    let url = urlApi + "/" + id + "/tasks/";

    let task = {
        text: textTask.value,
        idUtilisateur: id
    };

    jQuery.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(task),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        }
    });
    getListTask(id);
});