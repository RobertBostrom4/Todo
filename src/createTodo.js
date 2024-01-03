export function createTodo(title) {

    const todo = {
        title: title,
        date: 'No date',

        getDate: function () {
            return this.date;
        },

        setDate: function (newDate) {
            this.date = newDate;
        },

        getTitle: function () {
            return this.title;
        },

        setTitle: function (newTitle) {
            this.title = newTitle;
        },

    }

    return todo

};