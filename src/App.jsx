import React, { useState } from 'react';
import shortid from 'shortid';

function App() {
	const [task, setTask] = useState('');
	const [tasks, setTasks] = useState([]);
	const [editForm, setEditForm] = useState(false);
	const [idToEdit, setIdToEdit] = useState('');
	const [error, setError] = useState(null);

	const addTask = (e) => {
		e.preventDefault();

		if (!task.trim()) {
			console.log('Please enter a task');
			setError('Please enter a task');
			return;
		}

		setTasks([...tasks, { id: shortid.generate(), task }]);
		setTask('');
		setError(null);
	};

	const deleteTask = (taskToDelete) => {
		const newArray = tasks.filter((item) => item.id !== taskToDelete);
		setTasks(newArray);
		setEditForm(false);
		setError(null);
	};

	const editFormStructure = (taskToEdit) => {
		setEditForm(true);
		setTask(taskToEdit.task);
		setIdToEdit(taskToEdit.id);
	};

	const editTask = (e) => {
		e.preventDefault();

		if (!task.trim()) {
			console.log('Please enter a task to edit');
			setError('Please enter a task to edit');
			return;
		}

		const arrayNewTasks = tasks.map((item) => (item.id === idToEdit ? { id: idToEdit, task } : item));

		setTasks(arrayNewTasks);
		setEditForm(false);
		setTask('');
		setError(null);
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center">TASK APLICATION</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Task list</h4>
					<ul className="list-group">
						{tasks.length === 0 ? (
							<li className="list-group-item">No task yet!!</li>
						) : (
							tasks.map((task) => (
								<li key={task.id} className="list-group-item">
									<span className="lead">{task.task}</span>

									<button
										className="btn btn-danger btn-sm float-right mx-2"
										onClick={() => deleteTask(task.id)}
									>
										Delete
									</button>

									<button
										className="btn btn-warning btn-sm float-right"
										onClick={() => editFormStructure(task)}
									>
										Edit
									</button>
								</li>
							))
						)}
					</ul>
				</div>
				<div className="col-4">
					<h4 className="text-center">{editForm ? 'Edit task' : 'Add Task'}</h4>
					<form onSubmit={editForm ? editTask : addTask}>
						{error ? <span className="text-danger">{error}</span> : null}
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Enter a new task"
							onChange={(e) => setTask(e.target.value)}
							value={task}
						/>

						{editForm ? (
							<button className="btn btn-warning btn-block" type="submit">
								Edit
							</button>
						) : (
							<button className="btn btn-dark btn-block" type="submit">
								Add
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
