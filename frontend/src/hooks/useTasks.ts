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

  // Filters
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/api/tasks", {
        params: {
          status: status || undefined,
          from: from || undefined,
          to: to || undefined,
          page,
          limit,
        },
      });

      setTasks(res.data.tasks);
      setTotal(res.data.total);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [status, from, to, page, limit]);

  // Search
  const searchTasks = async () => {
    if (!query.trim()) {
      return fetchTasks();
    }

    setLoading(true);
    try {
      const res = await api.get("/api/tasks/search", {
        params: { query },
      });
      setTasks(res.data);
      setTotal(res.data.length);
    } catch (err: any) {
      setError(err?.message ?? "Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (title: string, description?: string) => {
    const res = await api.post<Task>("/api/tasks", { title, description });
    fetchTasks();
    return res.data;
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    const res = await api.put<Task>(`/api/tasks/${id}`, data);
    fetchTasks();
    return res.data;
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return {
    tasks,
    total,
    loading,
    error,

    // Filters
    status,
    query,
    from,
    to,

    setStatus,
    setQuery,
    setFrom,
    setTo,

    // Pagination
    page,
    limit,
    setPage,

    fetchTasks,
    searchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
