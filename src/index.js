import './style.css';
import { createForm } from './form.js';
import { createProjectButton } from './projectButton.js';
import _ from 'lodash';
import { showTodaysTasks } from './todayButtonLogic.js';
import { showTasksThisWeek } from './upcomingButtonLogic.js';

const projectForm = createForm();
const input = projectForm.querySelector('input');
const cancelButton = projectForm.querySelector('.cancel-button');
const projectformAddButton = projectForm.querySelector('.add-button');
const todayButton = document.querySelector('.today-button');
const upcomingButton = document.querySelector('.upcoming');

let projects = {};

if (localStorage.length === 0) {
    const stringifiedData = JSON.stringify(projects);
    localStorage.setItem('savedProjects', stringifiedData);
}

const addProjectButton = document.querySelector('.add-project');
const projectsSection = document.querySelector('.projects');

cancelButton.addEventListener("click", () => {

    projectsSection.removeChild(projectForm);
    projectsSection.appendChild(addProjectButton);

});


addProjectButton.addEventListener("click", () => {

    projectsSection.appendChild(projectForm);
    projectsSection.removeChild(addProjectButton);

});

projectformAddButton.addEventListener("click", () => {
    //Check if project is already included in the data, if not, add it

    const retrievedData = localStorage.getItem('savedProjects');
    const parsedData = JSON.parse(retrievedData);

    let isIncluded = false;

    for (const item in parsedData) {
        if (item === input.value) {
            isIncluded = true;
        }
    }

    if (isIncluded || input.value === '') {
        alert('Pick a new project name!');

    } else {

        const project = createProjectButton(input.value);
        const projectButtonSection = document.createElement('div');
        projectButtonSection.style.display = 'flex';
        projectButtonSection.style.justifyContent = 'space-between';
        projectButtonSection.style.width = '100%';
        const removeProjectButton = document.createElement('button');
        removeProjectButton.className = 'remove-project-button';


        removeProjectButton.addEventListener('click', () => {

            projectsSection.removeChild(projectButtonSection);
        });

        projectButtonSection.appendChild(removeProjectButton);
        projectButtonSection.insertBefore(project, removeProjectButton);

        projectsSection.appendChild(projectButtonSection);
        projectsSection.removeChild(projectForm);
        projectsSection.appendChild(addProjectButton);

        parsedData[input.value] = [];

        const updatedStringifiedData = JSON.stringify(parsedData);
        localStorage.setItem('savedProjects', updatedStringifiedData);



        console.log(localStorage.getItem('savedProjects'));
    }

});

const showProjects = () => {
    const retrievedData = localStorage.getItem('savedProjects');
    const parsedData = JSON.parse(retrievedData);

    for (const key in parsedData) {
        const project = createProjectButton(key);
        const projectButtonSection = document.createElement('div');
        projectButtonSection.style.display = 'flex';
        projectButtonSection.style.justifyContent = 'space-between';
        projectButtonSection.style.width = '100%';
        const removeProjectButton = document.createElement('button');
        removeProjectButton.className = 'remove-project-button';

        //Remove projects

        removeProjectButton.addEventListener('click', () => {
            _.unset(parsedData, key);
            projectsSection.removeChild(projectButtonSection);

            const updatedStringifiedData = JSON.stringify(parsedData);
            localStorage.setItem('savedProjects', updatedStringifiedData);
        });


        projectButtonSection.appendChild(removeProjectButton);
        projectButtonSection.insertBefore(project, removeProjectButton);
        projectsSection.insertBefore(projectButtonSection, addProjectButton);

    }

}


todayButton.addEventListener("click", (showTodaysTasks));
upcomingButton.addEventListener("click", (showTasksThisWeek));

showProjects();



