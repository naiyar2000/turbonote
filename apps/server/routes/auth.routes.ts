import { Router } from "express";
import { fetchUser, loginUser } from "../controllers/auth.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", (req, res) => {
    loginUser(req, res)
});

router.post("/user",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        fetchUser(req, res);
    });

export default router;
