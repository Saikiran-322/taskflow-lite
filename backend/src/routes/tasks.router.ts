import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller";

const router = Router();

// NEW enhanced list (filter + pagination)
router.get("/", TaskController.getFiltered);

// NEW search route
router.get("/search", TaskController.search);

router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getOne);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.remove);

export default router;
