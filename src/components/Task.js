import React, { useState } from 'react';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskIndex, setEditTaskIndex] = useState(-1);
    const [taskStatus, setTaskStatus] = useState([]);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            if (editTaskIndex !== -1) {
                // Update existing task
                const updatedTasks = [...tasks];
                updatedTasks[editTaskIndex] = newTask;
                setTasks(updatedTasks);
                setEditTaskIndex(-1);
            } else {
                // Add new task
                setTasks([...tasks, newTask]);
                setTaskStatus([...taskStatus, 'Pending']);
            }
            setNewTask('');
        }
    };

    const handleEditTask = (index) => {
        setNewTask(tasks[index]);
        setEditTaskIndex(index);
    };

    const handleStatusChange = (index, newStatus) => {
        const updatedStatus = [...taskStatus];
        updatedStatus[index] = newStatus;
        setTaskStatus(updatedStatus);
    };

    const completedTasks = taskStatus.filter(status => status === 'Complete').length;
    const totalTasks = tasks.length;
    const completedPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Task List</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddTask}
                >
                    {editTaskIndex === -1 ? 'Add Task' : 'Update Task'}
                </button>
            </div>
            <ul className="list-group">
                {tasks.map((task, index) => (
                    <>
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {task}
                            <div>
                                <button
                                    className="btn btn-sm btn-secondary mr-2"
                                    onClick={() => handleEditTask(index)}
                                >
                                    Edit
                                </button>
                                <select
                                    className="form-control-sm"
                                    value={taskStatus[index]}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </div>
                        </li>
                        <br />
                    </>
                ))}
            </ul>
            <p className="mt-3">
                Percentage of completed tasks: <p className='text-success'>{completedPercentage}%</p>
            </p>
        </div>
    );
};

export default Task;
