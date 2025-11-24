import { Request, Response } from "express";
import { TaskService } from "../services/tasks.service";

export const TaskController = {
  async getAll(req: Request, res: Response) {
    const tasks = await TaskService.getAll();
    res.json(tasks);
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const task = await TaskService.getOne(id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  },

  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await TaskService.create({ title, description });
    res.status(201).json(newTask);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updated = await TaskService.update(id, req.body);
    res.json(updated);
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    await TaskService.remove(id);
    res.status(204).send();
  },
};
