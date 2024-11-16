import { useState } from "react";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low Priority");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDate) return;
    setTasks([
      ...tasks,
      {
        title: taskTitle,
        date: taskDate,
        time: taskTime,
        priority: taskPriority,
      },
    ]);
    setTaskTitle("");
    setTaskDate("");
    setTaskTime("");
  };

  return (
    <div className="bg-blue-600/10 min-h-screen font-sans my-10">
      {/* Header */}
      <header className="bg-blue-500/10 border-b-2 border-b-[#0690E3] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daily Task Manager</h1>
        </div>
      </header>

      {/* Task Input Section */}
      <section className="container  mx-auto p-4 mt-4">
        <div className="bg-blue-500/10 backdrop-blur-2xl p-6 rounded shadow-md">
          <h2 className="text-xl text-[#0690E3] font-bold mb-4">
            Add New Task
          </h2>
          <form
            onSubmit={handleAddTask}
            className="flex flex-col space-y-4 text-white"
          >
            <input
              type="text"
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border  p-2 bg-blue-300/10 backdrop-blur-xl border-[#0690E3] rounded w-full"
              required
            />
            <div className="grid grid-cols-2 gap-x-4 items-center">
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="border  p-2 bg-blue-300/10 backdrop-blur-xl border-[#0690E3] rounded w-full"
                required
              />
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="border  p-2 bg-blue-300/10 backdrop-blur-xl border-[#0690E3] rounded w-full"
                required
              />
            </div>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="border text-blue-400  p-2 bg-blue-300/10 backdrop-blur-xl border-[#0690E3] rounded w-full"
            >
              <option>Low Priority</option>
              <option>Medium Priority</option>
              <option>High Priority</option>
            </select>
            <button
              type="submit"
              className="text-white font-bold text-xl  border border-[#0690E3] p-3 bg-[#0690E3] backdrop-blur-xl hover:bg-gradient-to-br from-sky-400 via-[#0690E3] transition-all duration-200 rounded"
            >
              Add Task
            </button>
          </form>
        </div>
      </section>

      {/* Task List Section */}
      <section className="container mx-auto p-4 mt-4">
        <div className="bg-blue-500/10 text-black p-6 rounded shadow-md">
          <h2 className="text-xl text-[#0690E3] font-bold mb-4">Task List</h2>
          {tasks.length ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="space-y-4 text-white bg-blue-300/10 backdrop-blur-xl border-[#0690E3] "
              >
                <div className="flex justify-between items-center p-4 border rounded">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-300">
                      Due: {task.time}, {task.date} | Priority: {task.priority}
                    </p>
                  </div>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">You have not added any Task today</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Task;
