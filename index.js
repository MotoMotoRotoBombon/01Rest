const express = require ('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/tasks' , taskRoutes);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: ${PORT}`);
})