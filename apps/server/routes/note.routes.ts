// server/routes/note.routes.ts
import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, searchNote, updateNote } from "../controllers/note.controller";
import { verifyFirebaseToken } from "../middlewares/authMiddleware";

const router = express.Router();


router.get("/search", (req, res, next) => {
    verifyFirebaseToken(req, res, next);
}, (req, res) => {
    searchNote(req, res);
});

router.get(
    "/",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        getAllNotes(req, res)
    }
);

router.get(
    "/:id",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        getNoteById(req, res);
    }
);

router.post(
    "/",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        createNote(req, res);
    }
);

router.put(
    "/:id",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        updateNote(req, res);
    }
);

router.delete(
    "/:id",
    (req, res, next) => {
        verifyFirebaseToken(req, res, next);
    },
    (req, res) => {
        deleteNote(req, res);
    }
);

export default router;
