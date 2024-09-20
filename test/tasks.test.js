const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');

const taskController = require('../controllers/taskController');
const expect = chai.expect;

describe('GET /tasks', () => {
    it('Deberia de devolver las tareas con status 200 cuando hay tareas'), async () => {
        const tasks = [
            {
                id: 1,
                title: "Tarea1",
                description: "Descripción de la tarea 1"
            },
            {
                id: 2,
                title: "Tarea2",
                description: "Descripción de la tarea 2"
            },
            {
                id: 3,
                title: "Tarea3",
                description: "Descripción de la tarea 3"
            }
        ];
        const res = await request(app).get('/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expecto(res.body.lenght).to.equal(3);
        expect(res.body).to.deep.equal(tasks);
    };
});