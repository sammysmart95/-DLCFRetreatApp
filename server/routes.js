import express, { Router } from "express";
import { CreateParticipant } from './controllers/api'
import path from "path";

const api = Router();
const router = Router();

router.use(express.static(path.join(__dirname, "../client/build")));

router.use("/api", api);

// Auth
api.get("/me", (req, res) => {
  res.json({
    send: 'hey'
  })
});

api.post('/registerParticipant', CreateParticipant)

export default router;
