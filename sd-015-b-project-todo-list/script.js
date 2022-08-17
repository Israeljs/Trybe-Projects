const butaoCriar = document.getElementById('criar-tarefa');
const butaoApagar = document.getElementById('apaga-tudo');

function toDoList() {
  const listaTarefas = document.getElementById('lista-tarefas');
  const input = document.getElementById('texto-tarefa');
  const li = document.createElement('li');

  li.innerHTML = input.value;
  listaTarefas.appendChild(li);
  input.value = '';
  li.addEventListener('click', function (event) {
    const selected = document.querySelector('.selected');

    if (selected) {
      selected.classList.remove('selected');
      selected.style.backgroundColor = 'white';
    }

    event.target.style.backgroundColor = 'rgb(128,128,128)';
    event.target.classList.add('selected');
  });

  li.addEventListener('dblclick', function (event) {
    // event.classList.toggle('completed');
    const completed = event.target.classList;
    
    if (completed.contains('completed')) {
      event.target.classList.remove('completed');
    } else {
      event.target.classList.add('completed');
    }      
  });

  // butaoApagar.addEventListener('click', function () {
  //   li.innerText = '';
  // });
}

butaoApagar.addEventListener('click', function () {
  const listaTarefas = document.getElementById('lista-tarefas');
  
  if (listaTarefas.parentNode) {
  listaTarefas.parentNode.removeChild(listaTarefas);
  }else {

  }
});

butaoCriar.addEventListener('click', toDoList);
  