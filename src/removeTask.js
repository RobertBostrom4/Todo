export function removeTask(todo, taskInfo) {
    const _ = require('lodash');

    const retrievedData = localStorage.getItem('savedProjects');
    const parsedData = JSON.parse(retrievedData);
    const taskHeader = taskInfo.parentNode.querySelector('header');
    let projectTasks = parsedData[taskHeader.textContent];

    _.remove(projectTasks, (item) => item.title === todo.title);
    const updatedStringifiedData = JSON.stringify(parsedData);
    localStorage.setItem('savedProjects', updatedStringifiedData);
    console.log(projectTasks);

    taskInfo.parentNode.removeChild(taskInfo);

}