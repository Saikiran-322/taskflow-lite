import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import TaskCard from "../components/TaskCard";
import TaskForm from "./TaskForm";
import { useTasks } from "../hooks/useTasks";

export default function TaskList() {
  const {
    tasks,
    loading,
    error,
    total, // ✅ keep this (used later)

    status,
    query,
    from,
    to,
    page,

    setStatus,
    setQuery,
    setFrom,
    setTo,
    setPage,

    searchTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" mb={4}>
        TaskFlow Lite
      </Typography>
      {/* SEARCH BAR */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={searchTasks}>
          Search
        </Button>
      </Box>
      {/* FILTERS */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="From"
          InputLabelProps={{ shrink: true }}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <TextField
          type="date"
          label="To"
          InputLabelProps={{ shrink: true }}
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <Button variant="outlined" onClick={() => setPage(1)}>
          Apply
        </Button>
      </Box>
      {/* CREATE FORM */}
      <TaskForm onCreate={createTask} /> {/* ❤️ Fixed */}
      {/* TASK LIST */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : tasks.length === 0 ? (
        <Typography>No tasks found.</Typography>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={(t) =>
              updateTask(t.id, {
                status: t.status === "pending" ? "completed" : "pending",
              })
            }
            onEdit={(t) => updateTask(t.id, t)}
            onDelete={(id) => deleteTask(id)}
          />
        ))
      )}
      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>

        <Typography sx={{ pt: 1 }}>
          Page {page} of {Math.ceil(total / 5)}
        </Typography>

        <Button disabled={tasks.length < 5} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Container>
  );
}
