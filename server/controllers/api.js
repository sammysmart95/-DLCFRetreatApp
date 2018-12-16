import regeneratorRuntime from "regenerator-runtime";
import path from "path";
import mime from "mime";
import fs from "fs";

import Participants from "../models/participants";
import FileCollection from "../models/files";

export const CreateParticipant = (req, res) => {
  Participants.create(req.body)
    .then(data => {
      return res.json({
        message: `Congrats ${req.body.fullName || ""}`
      });
    })
    .catch(err => {
      return res.status(500).json({
        err: err,
        message: err.message,
        customMessage: "Error Registering Participant"
      });
    });
};

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
};

export const DownloadFile = (req, res) => {
  const id = req.params.id;
  FileCollection.find({ _id: id })
    .then(data => {
      let file = path.join(__dirname, `../${data[0].filePath}`);
      console.log(file);
      var filename = path.basename(file);
      var mimetype = mime.getType(file);

      res.setHeader("Content-disposition", "attachment; filename=" + filename);
      res.setHeader("Content-type", mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
      // res.sendFile(file);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Error fetching files",
        err: err.message
      });
    });
};

export const AuthMe = (req, res) => {
  let user = req.user;
  console.log(user);
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


export const GetParticipants = async (req, res) => {
  let page = parseInt(Number(req.params.id));
  let searchKey = req.body.searchKey;
  let searchQuery = {};
  if (searchKey) {
    let search = {
      $regex: searchKey || "",
      $options: "i"
    };
    searchQuery = {
      $or: [
        {
          sid: search
        },
        {
          fullName: search
        },
        {
          denomination: search
        },
        {
          category: search
        },
        {
          phoneNumber: search
        },
        {
          state: search
        },
        {
          institution: search
        },
        {
          status: search
        }
      ]
    };
  }
  if (!page) {
    page = 1;
  }
  try {
    let [count, participants] = await Promise.all([
      Participants.find(searchQuery).count(),
      Participants.find(searchQuery)
        .sort("-created")
        .skip(page * 25 - 25)
        .limit(25)
    ]);
    return res.json({
      count,
      participants
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error Loading Participant List",
      error: err.message
    });
  }
};
