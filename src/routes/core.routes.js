const groupHandlers = require('./../handlers/group.handlers');

const express = require('express');
const router = express.Router();

router.get('/groups', groupHandlers.getAllGroups);

module.exports = router;