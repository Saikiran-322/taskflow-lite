import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Task[]>("/api/tasks");
      setTasks(res.data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (title: string, description?: string) => {
    const res = await api.post<Task>("/api/tasks", { title, description });
    setTasks((prev) => [res.data, ...prev]);
    return res.data;
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    const res = await api.put<Task>(`/api/tasks/${id}`, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    return res.data;
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/api/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
