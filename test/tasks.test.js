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
                startDate: '20-09-24',
                endDate: '20-09-24',
                status: 'pendiente',
                teamMembers: ["Reymundo Sahagún", "Rodolfo Frias", "Jorge Gonzalez", "Cesar Uriel"],
            },
        ];

        const res = await request(app).get('/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
        expect(res.body).to.deep.equal(tasks);
    });
});
