let tasks = [
    {
        id: 1,
        title: "Tarea1",
        description: "Descripción de la tarea 1",
        startDate: '20-09-24',
        endDate: '20-09-24',
        status: 'pendiente',
        teamMembers: ['Jaacasc,acasca,ascascas,ascasca'],
    },
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

function createTask(title, description,startDate,endDate,status,teamMembers) {
    const newId = getNextId();
    const newTask = {
        id: newId,
        title,
        description,
        startDate,
        endDate,
        status,
        teamMembers
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

