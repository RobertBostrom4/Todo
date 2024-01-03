import { taskInformation } from "./taskInformation";

export function showTodaysTasks() {

    const todayTaskHeader = document.createElement('header');
    todayTaskHeader.className = 'today-task-header';
    todayTaskHeader.innerText = 'Today';
    todayTaskHeader.style.marginBottom = '20px';
    
    const retrievedData = localStorage.getItem('savedProjects');
    const parsedData = JSON.parse(retrievedData);

    document.querySelector('.tasks').innerHTML = '';
    document.querySelector('.tasks').appendChild(todayTaskHeader);

    for (const project in parsedData) {
        for (const task of parsedData[project]) {

            const information = taskInformation(task);
            const todaysDate = new Date();
            const taskDate = new Date(task.date);

            const taskDateDay = (taskDate.getDate() + 1) + '' + taskDate.getMonth() + '' + taskDate.getFullYear();
            const todaysDateDay = (todaysDate.getDate()) + '' + todaysDate.getMonth() + '' + todaysDate.getFullYear();

            if (taskDateDay == todaysDateDay) {
                document.querySelector('.tasks').appendChild(information);
            }


        }
    }


}