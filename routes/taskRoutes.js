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
    const { title, description } = req.body;
    const newTask = taskController.createTask(title, description);
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