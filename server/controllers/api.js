import regeneratorRuntime from "regenerator-runtime";
import path from 'path'

import Participants from '../models/participants'
import FileCollection from '../models/files'

export const CreateParticipant = (req, res) => {
  Participants.create(req.body).then(data => {
    return res.json({
      message: `Congrats ${req.body.fullName || ''}`
    })
  }).catch(err => {
    return res.status(500).json({
      err: err,
      message: err.message,
      customMessage: "Error Registering Participant"
    })
  })
}

export const GetFiles = async (req, res) => {
  try {
    let [fileCollection, count] = await Promise.all([
      FileCollection.find().sort("created"),
      FileCollection.find().count()
    ]);
    return res.json({
      fileCollection,
      count
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching files",
      err: err.message
    });
  }
}

export const DownloadFile = (req, res) => {
  const id = req.params.id
  FileCollection.find({_id: id}).then(data => {
    let filePath = path.join(__dirname, `../${data[0].filePath}`)
    console.log(filePath)
    res.sendFile(filePath)
  }).catch(err => {
    res.status(500).json({
      message: "Error fetching files",
      err: err.message
    });
  })
}

export const AuthMe = (req, res) => {
  let user = req.user;
  console.log(user)
  if (user) {
    return res.json({
      authenticated: true,
      user: user
    });
  }
  return res.json({
    authenticated: false
  });
};