const express = require('express');
const router = express.Router();
const {
    CreateAppointment,
    ListMeetings,
  } = require("../controllers/zoomController.js");

router.route("/meetings").post(CreateAppointment);
router.route("/meetings").get(ListMeetings);

module.exports = router; // Export the router so it can be used in server.js
