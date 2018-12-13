import express, { Router } from "express";
import { CreateParticipant, GetFiles, DownloadFile } from './controllers/api'
import { FileUpload } from './controllers/admin'
import { CreateUser, Login } from './controllers/auth'
import path from "path";
import auth from './config/passport'

const api = Router();
const router = Router();

router.use(express.static(path.join(__dirname, "../client/build")));

router.use("/api", api);

router.post('/auth/register', auth.optional, CreateUser)
router.post('/auth/login', auth.optional, Login)

// Auth
api.get("/me", (req, res) => {
  res.json({
    send: 'hey'
  })
});

api.get('/getFiles', GetFiles)
api.get('/downloadFile/:id', DownloadFile)

api.post('/registerParticipant', CreateParticipant)
api.post('/uploadFile', FileUpload)


export default router;
