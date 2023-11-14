const date = document.querySelector('#date');
const input = document.querySelector('#input');
const enter = document.querySelector('#enter');
const list = document.querySelector('#list');
const tasks = document.querySelector('.task');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
const transparent = 'transparent';

let id = 0;
let listTasks = [];

let today = new Date();
date.innerHTML = today.toLocaleDateString('es-MX', {weekday: 'long', month: 'short', day: 'numeric'});

let data = localStorage.getItem("TO-DO");

if (data) {
	listTasks = JSON.parse(data);
	id = listTasks.length;
	loadList(listTasks);

	if (tasks.querySelector('.text') != null){
		tasks.querySelector('.task__p').classList.toggle(transparent);
	}
}

function loadList(DATA){
	DATA.forEach(function(i){
		addTask(i.task, i.id, i.taskCheck);
	});
}

function addTask(task, id, taskCheck) {

	let CHECK = taskCheck ? check : uncheck;
	let LINE = taskCheck ? lineThrough : "";

	let element = `<li id="task${id}">
					<i class="fa ${CHECK}" data="taskCheck" id="0"></i>
					<p class="text ${LINE}">${task}</p>
				    <i class="fa fa-trash" data="taskDel" id="0"></i>
				   </li>`;

	list.insertAdjacentHTML("beforeend",element);
	
}

enter.addEventListener("click", ()=> {
	let task = input.value;

	if (task){

		if (tasks.querySelector('.text') == null){
			tasks.querySelector('.task__p').classList.toggle(transparent);
		}

		addTask(task, id, false);

		listTasks.push({task: task, id: id, taskCheck: false});
		localStorage.setItem("TO-DO", JSON.stringify(listTasks));
		id += 1;
	}

	input.value='';
})

document.addEventListener("keyup", function(event){

	if (event.key == 'Enter'){
		let task = input.value;

		if (task){

			if (tasks.querySelector('.text') == null){
				tasks.querySelector('.task__p').classList.toggle(transparent);
			}

			addTask(task, id, false);

			listTasks.push({task: task, id: id, taskCheck: false});
			localStorage.setItem("TO-DO", JSON.stringify(listTasks));
			id+=1;
		}

		input.value='';
	}
})

list.addEventListener("click", function(event){
	let element = event.target;
	let data = element.attributes.data.value;

	if (data == "taskDel") {
		deleteTask(element);

		if (tasks.querySelector('.text') == null){
			tasks.querySelector('.task__p').classList.toggle(transparent);
		}

	} else if (data == "taskCheck"){
		completeTask(element);
	}

	localStorage.setItem("TO-DO", JSON.stringify(listTasks));
	
})

function completeTask(element){
	element.classList.toggle(check);
	element.classList.toggle(uncheck);
	element.parentNode.querySelector('.text').classList.toggle(lineThrough);
	
	let index = element.parentNode.id.slice("task".length);
	listTasks[index].taskCheck = listTasks[index].taskCheck ? false : true;
	console.log(listTasks);
}

function deleteTask(element){
	let index = parseInt(element.parentNode.id.slice("task".length));
	let parent = element.parentNode.parentNode;

	console.log(element.parentNode.id);

	element.parentNode.remove();
	
	listTasks.splice(index, 1);

	for(i = index; i < listTasks.length; i++){
		listTasks[i].id = i;

		if (i != index){
			let element = parent.querySelector('#task'+i);
			element.id = 'task'+(i-1);
		}
	}

	console.log(i);
	console.log(index);

	if (i != index){
		console.log("entra");
		element = parent.querySelector('#task'+i);
		element.id = 'task'+(i-1);
	}
	

	id--;
	console.log(id);
	console.log(listTasks);
}

