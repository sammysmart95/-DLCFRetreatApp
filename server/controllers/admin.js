import regeneratorRuntime from "regenerator-runtime";
import path from 'path'
import fs from 'fs'
import json2xls from 'json2xls'
import moment from 'moment'

import Participant from '../models/participants'
import Feedbacks from '../models/feedback'
import FileCollection from '../models/files'
import Testimonies from '../models/testimonies'

export const FileUpload = (req, res) => {
  let fileName = req.body.name
  let audioFile = req.files.file
  uploadFile(audioFile, fileName).then(({ filePath, originalName }) => {
    FileCollection.create({
      fileName,
      filePath: filePath,
      originalName,
    }).then(response => {
      res.json({
        message: 'Uploaded'
      })

    }).catch(err => {
      console.log(err)
      res.status(500).json({
        err: err,
        message: err.message
      })
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      err: err,
      message: err.message
    })
  })
}

const uploadFile = (imageFile, fileName) => {
  return new Promise((resolve, reject) => {
    const newFilename = '';
    imageFile.mv(path.join(__dirname, `../public/${fileName, newFilename}-${imageFile.name}`), function (err) {
      if (err) {
        reject(err);
      }
      resolve({ filePath: `public/${fileName, newFilename}-${imageFile.name}`, originalName: imageFile.name })
    })
  });
};

export const DownloadParticipantList = async (req, res) => {
  try {
    let [count, participants] = await Promise.all([
      Participant.find().count(),
      Participant.find()
    ])
    res.setHeader("Content-Type", "application/vnd.openxmlformats")

    const formattedParticipants = participants.map((participant, i) => {
      if (participant._doc) {
        let participantDetail = {};
        participantDetail["Id"] = i + 1
        participantDetail["Full Name"] = participant._doc.fullName
        participantDetail["Gender"] = participant._doc.gender
        participantDetail["Email"] = !Number(participant._doc.email) ? participant._doc.email : ''
        participantDetail["Phone Number"] = participant._doc.phoneNumber
        participantDetail["WhatsApp Number"] = participant._doc.whatsAppNumber
        participantDetail["Category"] = participant._doc.category
        participantDetail["Institution"] = participant._doc.institution
        participantDetail["Course"] = participant._doc.course
        participantDetail['Status'] = participant._doc.status
        participantDetail["Denomination"] = participant._doc.denomination
        participantDetail["Address"] = participant._doc.address
        participantDetail["Group"] = participant._doc.group
        participantDetail["Age Group"] = participant._doc.ageGroup
        participantDetail["Date Registered"] = moment(participant._doc.created).format('MMM Do YY')
        return participantDetail
      }
      return participant
    })

    let xls = json2xls(formattedParticipants, {
      fields: {
        "Id": "string",
        "Full Name": "string",
        "Gender": "string",
        "Email": "string",
        "Age Group": "string",
        "Phone Number": "string",
        "WhatsApp Number": "string",
        "Institution": "string",
        "Course": "string",
        "Category": "string",
        "Status": "string",
        "Denomination": "string",
        "Address": "string",
        "Group": "string",
        "Date Registered": "string"
      }
    });
    fs.writeFileSync(
      path.join(__dirname, `../public/participantList.xlsx`),
      xls,
      "binary"
    );
    return res.sendFile(path.join(__dirname, `../public/participantList.xlsx`))
  } catch (err) {
    res.status(500).json({
      err: err,
      message: err.message,
      customMessage: 'Error downloading particiant list'
    })
  }
}

export const DownloadFeedbackList = async (req, res) => {
  try {
    let [count, feedbacks] = await Promise.all([
      Feedbacks.find().count(),
      Feedbacks.find()
    ])
    console.log('feedbacks')
    res.setHeader("Content-Type", "application/vnd.openxmlformats")
    const formattedFeedbackList = feedbacks.map((feedback, i) => {
      if (feedback._doc) {
        let feedbackDetail = {};
        feedbackDetail["Id"] = i + 1
        feedbackDetail["Phone Number"] = feedback._doc.phoneNumber
        feedbackDetail["Category"] = feedback._doc.category
        feedbackDetail["How did you get to the camp"] = feedback._doc.transport
        feedbackDetail["What Programme touched you the most"] = feedback._doc.message
        feedbackDetail["What do you love about the camp"] = feedback._doc.like
        feedbackDetail["Summarize your experiences"] = feedback._doc.experience
        feedbackDetail["What should be improved in the camp"] = feedback._doc.improvements
        console.log(feedbackDetail)
        return feedbackDetail
      }
      return feedback
    })

    let xls = json2xls(formattedFeedbackList, {
      fields: {
        "Id": "string",
        "Phone Number": "string",
        "Category": "string",
        "How did you get to the camp": "string",
        "What programme touched you the most": "string",
        "What do you love about the camp": "string",
        "Summarize your experiences": "string",
        "What should be improved in the camp": "string",
      }
    });
    fs.writeFileSync(
      path.join(__dirname, `../public/feedbackList.xlsx`),
      xls,
      "binary"
    );
    return res.sendFile(path.join(__dirname, `../public/feedbackList.xlsx`))
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err: err,
      message: err.message,
      customMessage: 'Error downloading feedbacks list'
    })
  }
}

export const DownloadTestimonyList = async (req, res) => {
  try {
    let [count, testimonies] = await Promise.all([
      Testimonies.find().count(),
      Testimonies.find()
    ])
    res.setHeader("Content-Type", "application/vnd.openxmlformats")
    const formatedTestimonyList = testimonies.map((testimony, i) => {
      if (testimony._doc) {
        let testimonyDetail = {};
        testimonyDetail["Id"] = i + 1
        testimonyDetail["Full Name"] = testimony._doc.fullName
        testimonyDetail["Phone Number"] = testimony._doc.phoneNumber
        testimonyDetail["Category"] = testimony._doc.category
        testimonyDetail["Testimony"] = testimony._doc.testimony
        testimonyDetail["Date Submitted"] = moment(testimony._doc.created).format("H:MM Do MMM YY")
        console.log(testimonyDetail)
        return testimonyDetail
      }
      return testimony
    })

    let xls = json2xls(formatedTestimonyList, {
      fields: {
        "Id": "string",
        "Full Name": "string",
        "Phone Number": "string",
        "Category": "string",
        "Testimony": "string",
        "Date Submitted": "string",
      }
    });
    fs.writeFileSync(
      path.join(__dirname, `../public/testimonyList.xlsx`),
      xls,
      "binary"
    );
    return res.sendFile(path.join(__dirname, `../public/testimonyList.xlsx`))
  } catch (err) {
    console.log(err)
    res.status(500).json({
      err: err,
      message: err.message,
      customMessage: 'Error downloading testimony list'
    })
  }
}