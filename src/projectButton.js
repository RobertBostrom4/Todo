import { createTodo } from "./createTodo";
import { createForm, form } from "./form";
import { taskInformation } from "./taskInformation";

export function createProjectButton(input) {

    const _ = require('lodash');

    const project = document.createElement('button');
    project.style.width = '100%';
    project.innerText = input;



    project.addEventListener("click", () => {

        const taskList = document.querySelector('.tasks');
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        const header = document.createElement('header');
        header.textContent = project.textContent;
        header.style.marginBottom = '20px';

        const newTaskForm = createForm(header.textContent);

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';


        addTaskButton.addEventListener("click", () => {

            taskList.appendChild(newTaskForm);
            taskList.removeChild(addTaskButton);


            const newTaskFormAddButton = newTaskForm.querySelector('.add-button');
            const newTaskFormInput = newTaskForm.querySelector('input');

            //Add new Todo to localStorage and DOM
            newTaskFormAddButton.addEventListener('click', () => {

                taskList.removeChild(newTaskForm);

                const newTodo = createTodo(newTaskFormInput.value);
                const taskInfo = taskInformation(newTodo);

                const retrievedData = localStorage.getItem('savedProjects');
                const parsedData = JSON.parse(retrievedData);

                const isIncluded = _.some(parsedData[header.textContent], (obj) => {
                    return obj.title === newTodo.title;
                });

                if (isIncluded) {
                    alert('Must be a new task!');
                } else {
                    parsedData[header.textContent].push(newTodo);
                    const updatedStringifiedData = JSON.stringify(parsedData);
                    localStorage.setItem('savedProjects', updatedStringifiedData);

                    taskList.appendChild(taskInfo);
                    taskList.appendChild(addTaskButton);


                }


            });


        });



        taskList.appendChild(header);

        // Showing Todos
        const retrievedData = localStorage.getItem('savedProjects');
        const parsedData = JSON.parse(retrievedData);

        for (const task of parsedData[header.textContent]) {
            const shownTodo = taskInformation(task);
            taskList.appendChild(shownTodo);
        }



        taskList.appendChild(addTaskButton);



    });


    return project;

}