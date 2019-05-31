import express, { Router } from "express";
import { CreateParticipant, GetFiles, AuthMe, GetParticipants, CreateFeedback, CreateTestimony, GetFeedback, GetTestimonies, CheckUserData } from './controllers/api'
import { FileUpload, DownloadParticipantList, DownloadFeedbackList, DownloadTestimonyList } from './controllers/admin'
import { CreateUser, Login } from './controllers/auth'
import path from "path";
import auth from './config/auth'
import "./config/passport"

const api = Router();
const router = Router();

router.use("/api", api);

api.get("/me",  AuthMe);

// Auth
api.post('/auth/register', CreateUser)
api.post('/auth/login', Login)

// Get
api.get('/getFiles', GetFiles)
api.get('/downloadParticipantList', DownloadParticipantList)
api.get("/downloadFeedbackList", DownloadFeedbackList)
api.get("/downloadTestimonyList", DownloadTestimonyList)

// Queries
api.post('/getFeedbacks/:id', GetFeedback)
api.post("/getParticipants/:id", GetParticipants);
api.post("/getTestimonies/:id", GetTestimonies)

// Post
api.post("/submitFeedback", CreateFeedback)
api.post("/submitTestimony", CreateTestimony)
api.post('/registerParticipant', CreateParticipant)
api.post('/checkUser', CheckUserData)
api.post('/uploadFile', FileUpload)

export default router;
