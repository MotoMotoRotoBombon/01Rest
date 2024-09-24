const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');
const taskController = require('../controllers/taskController');
const expect = chai.expect;

describe('GET /tasks', () => {
    it('Debería devolver las tareas con status 200 cuando hay tareas', async () => {
        const tasks = [ 
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
    },
  
];


        const res = await request(app).get('/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        expect(res.body).to.deep.equal(tasks);
    });
});

describe('GET /tasks/1', () => {

    it('2. Debería devolver un consulta por id con status 200', async() => {
        const tasks = {
        id: 1,
        title: "Tarea1",
        description: "Descripción de la tarea 1",
        startDate: '2024-09-20',
        endDate: '2024-11-28',
        status: 'completado',
        teamMembers : ["Reymundo Sahagún","Rodolfo Frias","Jorge Gonzalez","Cesar Uriel"],
        budget: 5000,
    };

        const res = await request(app).get('/tasks/1');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(tasks);
    });
});
describe('DELETE /tasks/2', () => {

    it('3. Debería eliminar y regresar un estatus 200', async() => {

       const tasks = {
        id: 2,
        title: "Tarea2",
        description: "Descripción de la tarea 2",
        startDate: '2024-09-20',
        endDate: '2024-11-28',
        status: 'completado',
        teamMembers : ["Ana","Felipe","Karla","Lino"],
        budget: 5000,
    };

        const res = await request(app).delete('/tasks/2');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(tasks);
    });
});

describe('POST /tasks', () => {

    it('4. Debería agregar un arreglo y regresar un estatus 200', async() => {

        const tasks = {
        title: "Tarea3",
        description: "Descripción de la tarea 3",
        startDate: '2024-10-01',
        endDate: '2024-12-15',
        status: 'pendiente',
        teamMembers : ["Ana López", "David Ramírez", "Karla Mendoza", "Luis Fernandez"],
        budget: 3500,
    };

        const res = await request(app).post('/tasks').send(tasks);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.deep.equal(tasks);
    });
});

describe('PUT /tasks/1', () => {

    it('5. Debería actualizar y regresar un estatus 200', async() => {

        const tasks = {
        id: 1,
        title: "Tarea1",
        description: "Descripción de la tarea 1",
        startDate: '2024-09-20',
        endDate: '2024-11-28',
        status: 'pendiente',
        teamMembers : ["Reymundo Sahagún","Rodolfo Frias","Jorge Gonzalez","Cesar Uriel"],
        budget: 5000,
    };

        const res = await request(app).put('/tasks/1').send(tasks);

        expect(res.status).to.equal(200);
    });
});
