// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TasksContract {
    // Variables
    uint public taskCounter = 0;

    struct Task {
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    mapping(uint => Task) public tasks;

    // Eventos
    event TaskCreated(uint id, string title, string description, bool done, uint createdAt);
    event TaskToggleDone(uint id, bool done);

    // Constructor
    constructor() {
        createTask("Tarea de Ejemplo", "Esta primera tarea es una tarea de ejemplo.");
    }

    // Funciones
    /**
     * @notice Función que nos permite crear tareas.
     * @param _title Título de la tarea.
     * @param _description Descripción de la tarea.
     */
    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    /**
     * @notice Función que nos permite marcar si una tarea ha sido completada.
     * @param _id Identificador de la tarea.
     */
    function toggleDone(uint _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;

        emit TaskToggleDone(_id, _task.done);
    }
}