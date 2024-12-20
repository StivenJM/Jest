import { Router } from "express";
import { home, about } from "./../controllers/mainController.js";

const router = Router();

// Routes
router.get('/', home);
router.get('/about', about);

export default router;
