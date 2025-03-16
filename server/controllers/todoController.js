import Todo from "../models/todoModel.js";

//get all todos

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).send({
      message: "all todos",
      data: todos,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// create a todo

export const createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title });

  try {
    const newTodo = await todo.save();
    res.status(201).send({
      message: "todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// update a todo

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body; // Destructure fields from request body

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send({
        message: "todo not found",
      });
    }

    // Update only the fields provided in the request body
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    res.status(200).send({
      message: "todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).send({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo)
      return res.status(400).send({
        message: "todo not found",
      });

    await todo.deleteOne();

    res.status(201).send({
      message: "todo deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
