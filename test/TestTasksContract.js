const { assert } = require("chai");

const TasksContract = artifacts.require("./TasksContract");

contract("TasksContract", () => {

    before(async() => {
        this.tasksContract = await TasksContract.deployed();
    });

    it('Contrato desplegado correctamente', async() => {
        const address = this.tasksContract.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('Obtener lista de tareas', async() => {
        const taskCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(taskCounter);

        assert.equal(task.id.toNumber(), taskCounter);
        assert.equal(task.title, "Tarea de Ejemplo");
        assert.equal(task.description, "Esta primera tarea es una tarea de ejemplo.");
        assert.equal(task.done, false);
        assert.equal(taskCounter, 1);
    });

    it('Tarea creada correctamente', async() => {
        const result = await this.tasksContract.createTask("Segunda Tarea", "Esta es una segunda tarea");
        const taskEvent = await result.logs[0].args;
        const taskCounter = await this.tasksContract.taskCounter();

        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Segunda Tarea");
        assert.equal(taskEvent.description, "Esta es una segunda tarea");
        assert.equal(taskEvent.done, false);
    });

    it('Tarea marcada como completada correctamente', async() => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
    });

});