import Participants from '../models/participants'

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