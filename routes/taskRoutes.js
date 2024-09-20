const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// Rutas CRUD
router.get('/', (req, res) => {
    const tasks = taskController.getTasks();  // Ejecutar la función con paréntesis
    
    if (tasks.length > 0) {
        res.status(200).json(tasks);
    } else {
        res.status(404).json({ code: 404, message: 'Task not found' });
    }
});

router.post('/', (req, res) => {
    const { title, description, startDate, endDate, status, teamMembers } = req.body;

    // Expresión regular para validar el formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Validar que las fechas sigan el formato correcto
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        return res.status(400).json({
            code: 400,
            message: 'Formato de fecha no válido. Use el formato YYYY-MM-DD.'
        });
    }

    // Convertir fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Verificar que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
            code: 400,
            message: 'Las fechas proporcionadas no son válidas.'
        });
    }

    // Verificar que la fecha de finalización no sea menor que la de inicio
    if (end < start) {
        return res.status(400).json({
            code: 400,
            message: 'La fecha de finalización no puede ser menor que la fecha de inicio.'
        });
    }

    // Validar que el status sea uno de los permitidos
    const validStatuses = ['pendiente', 'completado', 'en progreso'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            code: 400,
            message: `El estado '${status}' no es válido. Los estados permitidos son: ${validStatuses.join(', ')}.`
        });
    }

    const newTask = taskController.createTask(title, description, startDate, endDate, status, teamMembers);
    res.status(201).json(newTask);
});

 
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertimos id a número
    const deletedTask = taskController.deleteTask(id);
    if (deletedTask) {
        res.status(200).json(deletedTask); // Devolvemos la tarea eliminada
    } else {
        res.status(404).json({ message: "Tarea no encontrada" }); // Si no se encontró, devolvemos un error 404
    }
}); 

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertimos id a número
    const updateFields = req.body; // Obtenemos los campos que deseamos actualizar
    const updatedTask = taskController.updateTask(id, updateFields);

    if(updatedTask){
        res.status(200).json(updatedTask); // Si se actualiz;ó, devolvemos la tarea actualizada
    } else{
        res.status(404).json({ message: "Tarea no encontrada" });
    }
})

router.get('/:id' , (req, res) => {
    const id = parseInt(req.params.id); // Convertimos id a número
    const task = taskController.getTaskById(id);
    if (task) {
        res.status(200).json(task); // Devolvemos la tarea encontrada
    }else{
       res.status(404).json({ message: "Tarea no encontrada" }); // Si no encuentra la tarea manda el eror 404  
    }   
});


module.exports = router;