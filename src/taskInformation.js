import { createTodo } from './createTodo';

export function taskInformation(todo) {
    const _ = require('lodash');

    const taskInformation = document.createElement('div');
    taskInformation.style.display = 'flex';
    taskInformation.style.justifyContent = 'space-between';
    taskInformation.style.height = '2rem';
    taskInformation.className = 'task-information';

    const dateAndRemoveButton = document.createElement('div');
    dateAndRemoveButton.style.display = 'flex';
    dateAndRemoveButton.justifyContent = 'center';

    let titleButton = document.createElement('button');
    titleButton.style.minWidth = '100px';
    titleButton.textContent = todo.title;
    titleButton.className = 'title-button';

    const taskDoneButton = document.createElement('button');
    taskDoneButton.style.width = '50px';
    taskDoneButton.className = 'task-done-button';


    const titleAndTaskDone = document.createElement('div');
    titleAndTaskDone.style.display = 'flex';
    titleAndTaskDone.justifyContent = 'center';

    titleAndTaskDone.appendChild(taskDoneButton);
    titleAndTaskDone.appendChild(titleButton);

    taskInformation.appendChild(titleAndTaskDone);

    const dateButton = document.createElement('button');
    dateButton.textContent = todo.date;
    dateButton.style.minWidth = '100px';
    dateButton.className = 'date-button';
    dateAndRemoveButton.appendChild(dateButton);

    const removeTaskButton = document.createElement('button');
    removeTaskButton.className = 'remove-task-button';
    dateAndRemoveButton.appendChild(removeTaskButton);


    taskInformation.appendChild(dateAndRemoveButton);

    dateButton.addEventListener('click', () => {

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateButton.style.display = 'none';

        dateAndRemoveButton.insertBefore(dateInput, dateButton);


        dateInput.addEventListener('input', () => {

            const retrievedData = localStorage.getItem('savedProjects');
            const parsedData = JSON.parse(retrievedData);
            const taskHeader = taskInformation.parentNode.querySelector('header');
            let projectTasks = parsedData[taskHeader.textContent];

            todo.date = dateInput.value;

            for (let task of projectTasks) {
                if (task.title == todo.title) {
                    task.date = todo.date;
                    const updatedStringifiedData = JSON.stringify(parsedData);
                    localStorage.setItem('savedProjects', updatedStringifiedData);
                }
            }

        });


        dateInput.addEventListener('mouseout', () => {

            if (dateInput.value == '' || dateInput.value == todo.date) {
                dateButton.textContent = todo.date

            } else {
                dateButton.textContent = dateInput.value;
            }

            dateAndRemoveButton.removeChild(dateInput);
            dateButton.style.display = 'inline-block';
        });


    });

    titleButton.addEventListener("click", () => {

        const newTitleInput = document.createElement('input');

        titleAndTaskDone.insertBefore(newTitleInput, titleButton);
        titleButton.style.display = 'none';

        newTitleInput.value = todo.title;


        newTitleInput.addEventListener('keypress', (event) => {

            if (event.code === "Enter") {
                if (newTitleInput.value == '') {
                    alert('Task name cannot be empty!');
                } else if (newTitleInput.value == todo.title) {
                    alert('The new task name cannot be the same!');
                } else {
                    //Check if recently changed todo is already included

                    const testTodo = createTodo(newTitleInput.value);
                    const retrievedData = localStorage.getItem('savedProjects');
                    const parsedData = JSON.parse(retrievedData);
                    const taskHeader = taskInformation.parentNode.querySelector('header');
                    const isIncluded = _.some(parsedData[taskHeader.textContent], (obj) => {
                        return obj.title === testTodo.title;
                    });


                    if (isIncluded) {
                        alert('Name is already taken!');
                    } else {
                        const projectTasks = parsedData[taskHeader.textContent];

                        for (let task of projectTasks) {
                            if (task.title == titleButton.textContent) {
                                task.title = newTitleInput.value;

                                titleButton.textContent = newTitleInput.value;
                                todo.title = newTitleInput.value;
                            }
                        }

                        const updatedStringifiedData = JSON.stringify(parsedData);
                        localStorage.setItem('savedProjects', updatedStringifiedData);

                    }

                    titleAndTaskDone.removeChild(newTitleInput);
                    titleButton.style.display = 'inline-block';
                }

            }
        });

        newTitleInput.addEventListener('mouseout', (event) => {

            if (newTitleInput.value == '' || newTitleInput.value == todo.title) {

                titleButton.textContent = newTitleInput.value;

            }

            titleAndTaskDone.removeChild(newTitleInput);
            titleButton.style.display = 'inline-block';


        });


    });

    removeTaskButton.addEventListener('click', () => {

        const retrievedData = localStorage.getItem('savedProjects');
        const parsedData = JSON.parse(retrievedData);
        const taskHeader = taskInformation.parentNode.querySelector('header');
        let projectTasks = parsedData[taskHeader.textContent];

        _.remove(projectTasks, (item) => item.title === todo.title);
        const updatedStringifiedData = JSON.stringify(parsedData);
        localStorage.setItem('savedProjects', updatedStringifiedData);
        console.log(projectTasks);

        taskInformation.parentNode.removeChild(taskInformation);
    });

    taskDoneButton.addEventListener('click', () => {
        const retrievedData = localStorage.getItem('savedProjects');
        const parsedData = JSON.parse(retrievedData);
        const taskHeader = taskInformation.parentNode.querySelector('header');
        let projectTasks = parsedData[taskHeader.textContent];

        _.remove(projectTasks, (item) => item.title === todo.title);
        const updatedStringifiedData = JSON.stringify(parsedData);
        localStorage.setItem('savedProjects', updatedStringifiedData);
        console.log(projectTasks);

        taskInformation.parentNode.removeChild(taskInformation);
    });


    return taskInformation;
}