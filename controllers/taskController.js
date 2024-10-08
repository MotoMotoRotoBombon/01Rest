let tasks = [
    {
        id: 1,
        title: "Tarea1",
        description: "Descripción de la tarea 1",
        startDate: '2024-09-20',
        endDate: '2024-11-28',
        status: 'completado',
        teamMembers : ["Reymundo Sahagún","Rodolfo Frias","Jorge Gonzalez","Cesar Uriel"],
        budget: 5000,
    },
    {
        id: 2,
        title: "Tarea2",
        description: "Descripción de la tarea 2",
        startDate: '2024-09-20',
        endDate: '2024-11-28',
        status: 'completado',
        teamMembers : ["Ana","Felipe","Karla","Lino"],
        budget: 5000,
    }
];

let availableIds = new Set(tasks.map(task => task.id));  // IDs disponibles

function  getTasks() {
    // Ordenar las tareas por ID antes de devolverlas
    return tasks.slice().sort((a, b) => a.id - b.id);
}

function getNextId() {
    let id = 1;
    while (availableIds.has(id)) {
        id++;
    }
    return id;
}

function createTask(title, description,startDate,endDate,status,teamMembers,budget) {
    const newId = getNextId();
    const newTask = {
        id: newId,
        title,
        description,
        startDate,
        endDate,
        status,
        teamMembers,
        budget
    };

    tasks.push(newTask);
    availableIds.add(newId);
    return newTask;
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const deletedTask = tasks.splice(index, 1)[0]; // Guardamos la tarea eliminada
        availableIds.delete(id); // Eliminar el ID de availableIds
        return deletedTask; // Devolvemos la tarea eliminada
    }
    return null; // Si no encuentra la tarea, devolvemos null
}

function getTaskById(id) {
    return tasks.find(task => task.id === id) || null;
}

function updateTask(id, updateFields) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updateFields }; // Actualiza la tarea
        return tasks[index]; // Devuelve la tarea actualizada
    }
    return null; // Si no encuentra la tarea, devolvemos null
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    getTaskById,
    updateTask
};

