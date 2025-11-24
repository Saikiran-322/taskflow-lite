import { useState } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "./TaskForm";
import type { Task } from "../hooks/useTasks";
import { useTasks } from "../hooks/useTasks";

export default function TaskList() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks();
  const [editing, setEditing] = useState<Task | null>(null);

  const handleCreate = async (title: string, description?: string) => {
    await createTask(title, description);
  };

  const handleToggle = async (task: Task) => {
    await updateTask(task.id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleEdit = (task: Task) => {
    setEditing(task);
  };

  const handleEditSubmit = async (title: string, description?: string) => {
    if (!editing) return;
    await updateTask(editing.id, { title, description });
    setEditing(null);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        TaskFlow Lite
      </Typography>

      {editing ? (
        <>
          <Typography variant="h6">Edit Task</Typography>
          <TaskForm
            onSubmit={handleEditSubmit}
            initial={{
              title: editing.title,
              description: editing.description ?? "",
            }}
            submitLabel="Update"
          />
        </>
      ) : (
        <>
          <Typography variant="h6">Create Task</Typography>
          <TaskForm onSubmit={handleCreate} />
        </>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}

      {!loading &&
        tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={handleToggle}
          />
        ))}
    </Container>
  );
}
