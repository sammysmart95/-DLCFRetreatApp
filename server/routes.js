import express, { Router } from "express";
import { CreateParticipant, GetFiles, DownloadFile, AuthMe } from './controllers/api'
import { FileUpload } from './controllers/admin'
import { CreateUser, Login } from './controllers/auth'
import path from "path";
import auth from './config/auth'
import "./config/passport"

const api = Router();
const router = Router();

router.use(express.static(path.join(__dirname, "../client/build")));

router.post('/auth/register', auth.optional, CreateUser)
router.post('/auth/login', auth.optional, Login)

router.use("/api", api);

// Auth
api.get("/me",  AuthMe);

api.get('/getFiles', GetFiles)
api.get('/downloadFile/:id', DownloadFile)

api.post('/registerParticipant', CreateParticipant)
api.post('/uploadFile', FileUpload)


export default router;
