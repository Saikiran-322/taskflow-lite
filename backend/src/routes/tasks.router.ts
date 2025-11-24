import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller";

const router = Router();

router.get("/", TaskController.getAll);
router.get("/:id", TaskController.getOne);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.remove);

export default router;
