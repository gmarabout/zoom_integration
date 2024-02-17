const asyncHandler = require("express-async-handler");

require("dotenv").config();
const KJUR = require("jsrsasign");

const {
  createZoomMeeting,
  listZoomMeetings,
} = require("../api/zoomAPI.js");

const CreateAppointment = asyncHandler(async (req, res) => {
  const data = req.body;
  const { id, password } = await createZoomMeeting(data);
  res.status(201).json({ id, password });
});


const ListMeetings = asyncHandler(async (req, res) => {
  const meetings = await listZoomMeetings();
  if (meetings === undefined) {
    res.status(400);
    throw new Error("No meeting found");
  } else {
    res.status(201).json({ meetings });
  }
});


module.exports = {
  CreateAppointment,
  ListMeetings,
};