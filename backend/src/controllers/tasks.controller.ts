import { Request, Response } from "express";
import { TaskService } from "../services/tasks.service";

export const TaskController = {
  // -----------------------
  // ORIGINAL CRUD CONTROLLERS
  // -----------------------
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

  // ------------------------------
  // NEW: FILTER / PAGINATION API
  // ------------------------------
  async getFiltered(req: Request, res: Response) {
    try {
      const { status, from, to, page = 1, limit = 10 } = req.query;

      const tasks = await TaskService.getFiltered(
        status as string,
        from as string,
        to as string,
        Number(page),
        Number(limit)
      );

      const total = await TaskService.countFiltered(
        status as string,
        from as string,
        to as string
      );

      res.json({
        page: Number(page),
        limit: Number(limit),
        total,
        tasks,
      });
    } catch (err) {
      console.error("FILTER ERROR:", err);
      res.status(500).json({ error: "Failed to filter tasks" });
    }
  },

  // ------------------------------
  // NEW: SEARCH API
  // ------------------------------
  async search(req: Request, res: Response) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }

      const tasks = await TaskService.search(query as string);
      res.json(tasks);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
      res.status(500).json({ error: "Search failed" });
    }
  },
};
