import directorRoutes from "@presentation/http/routes/DirectorRoutes";
import movieRoutes from "@presentation/http/routes/MovieRoutes";
import { Router } from "express";

const router = Router();
router.use("/movies", movieRoutes);
router.use("/directors", directorRoutes);

export default router;
