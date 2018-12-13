import path from 'path'
import uuid from 'uuid/v4';
import FileCollection from '../models/files'

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
    const newFilename = uuid();
    imageFile.mv(path.join(__dirname, `../public/${fileName, newFilename}-${imageFile.name}`), function(err) {
      if (err) {
        reject(err);
      }
      resolve({filePath: `public/${fileName, newFilename}-${imageFile.name}`, originalName: imageFile.name})
    })
  });
};