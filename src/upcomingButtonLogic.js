import { taskInformation } from "./taskInformation";

export function showTasksThisWeek() {
    const UpcomingTaskHeader = document.createElement('header');
    UpcomingTaskHeader.className = 'upcoming-task-header';
    UpcomingTaskHeader.innerText = 'Upcoming';
    UpcomingTaskHeader.style.marginBottom = '20px';

    const retrievedData = localStorage.getItem('savedProjects');
    const parsedData = JSON.parse(retrievedData);

    document.querySelector('.tasks').innerHTML = '';
    document.querySelector('.tasks').appendChild(UpcomingTaskHeader);


    for (const project in parsedData) {
        for (const task of parsedData[project]) {

            const information = taskInformation(task);
            const todaysDate = new Date();
            const taskDate = new Date(task.date);

            if (isDateFurtherAlong(taskDate, todaysDate)) {
                document.querySelector('.tasks').appendChild(information);
            }


        }
    }


}

function isDateFurtherAlong(date1, date2) {
    // Ensure both arguments are Date objects:
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        throw new Error('Invalid arguments: Both arguments must be Date objects.');
    }

    // Compare the dates directly:
    return date1 > date2;
}

