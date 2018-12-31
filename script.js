const urlApi = "http://localhost:8083";

const page = location.search.substr(6) || 0;

const tasksList = document.querySelector(".tasksList");
const newTask = document.getElementById("newTask");
const textTask = document.getElementById("text");

const id = 26;

function getListTask(idUtilisateur) {
    let url = urlApi + "/" + idUtilisateur + "/tasks/?page=" + page;
    $.get(url, function (data) {
        afficheListTask(data.content);
    });
}

function afficheListTask(listeTache) {
    tasksList.innerHTML = "";
    for (let tache in listeTache) {
        let li = document.createElement("li");
        li.className = "task";
        li.setAttribute("idTask", listeTache[tache].idTasks);
        tasksList.appendChild(li);
        let p = document.createElement("p");
        li.appendChild(p);
        p.classList.add("taskText");
        p.innerHTML = listeTache[tache].text;


        let buttonComplete = document.createElement("button");
        buttonComplete.classList.add("completeTaskBtn");
        buttonComplete.innerHTML = "Terminer";
        let buttonUpdate = document.createElement("button");
        buttonComplete.classList.add("updateTaskBtn");
        buttonUpdate.innerHTML = "Modifier";
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add("deleteTaskBtn");
        buttonDelete.innerHTML = "Supprimer";

        let divTasksBtn = document.createElement("div");
        divTasksBtn.classList.add("tasksButton");
        li.appendChild(divTasksBtn);

        divTasksBtn.appendChild(buttonComplete);
        divTasksBtn.appendChild(buttonUpdate);
        divTasksBtn.appendChild(buttonDelete);

        buttonDelete.addEventListener('click', function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            let idTask = buttonDelete.parentElement.parentElement.getAttribute("idTask");
            let url = urlApi + "/" + id + "/tasks/" + idTask;

            jQuery.ajax({
                url: url,
                type: "DELETE"
            });
            getListTask(id);
        });

        buttonUpdate.addEventListener('click', function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            let idTask = buttonDelete.parentElement.parentElement.getAttribute("idTask");
            let url = urlApi + "/" + id + "/tasks/" + idTask;

            var textUpdated = prompt("Entrez le texte de votre To Do", "null");

            if (textUpdated != null) {
                let taskUpdated = {
                    "idTasks": idTask,
                    "text": textUpdated,
                    "idUtilisateur": id
                };

                jQuery.ajax({
                    url: url,
                    type: "PUT",
                    data: JSON.stringify(taskUpdated),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        console.log(data);
                    }
                });
            }
            getListTask(id);
        })
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




