function openModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function closeModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function fetchTasks(){
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            insertTasks(res);
        });
}
fetchTasks();

function insertTasks(taskList){
    if(taskList.length > 0){
        lista.innerHTML = "";
        taskList.map(task => {
            lista.innerHTML += `
            <li>
                <h5>${task.titulo}</h5>
                <p>${task.descricao}</p>
                <div class="actions">                        
                    <i class="bx bx-trash lixeira" onclick="deleteTask(${task.id})"></i>
                </div>
            </li>
            `;
        });
    }
}

function createTask(){
    event.preventDefault();
    let task = {
        titulo: titulo.value,
        descricao: descricao.value,
    }
    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
    });
    closeModal();
    fetchTasks();
}

function deleteTask(id){
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        alert('Tarefa excluída com sucesso.');
        fetchTasks();
    });
}

function searchTask(){
    let items = document.querySelectorAll("ul li");
    let searchTerm = busca.value.toLowerCase();

    if(searchTerm.length > 0){
        items.forEach(li => {
            let taskText = li.children[1].innerText.toLowerCase();
            if(!taskText.includes(searchTerm)){
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');
            }
        });
    } else {
        items.forEach(li => {
            li.classList.remove('oculto');
        });
    }
}
