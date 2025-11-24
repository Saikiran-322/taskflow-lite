import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import type { Task } from "../hooks/useTasks";

type Props = {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onToggle?: (task: Task) => void;
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
        )}
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Status: {task.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            onToggle?.({
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            })
          }
        >
          Toggle
        </Button>
        <Button size="small" onClick={() => onEdit?.(task)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete?.(task.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
