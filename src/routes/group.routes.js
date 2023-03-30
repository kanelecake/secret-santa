const participantHandlers = require('./../handlers/participant.handlers');
const groupHandlers = require('./../handlers/group.handlers');

const express = require('express');
const router = express.Router();

router.post('/', groupHandlers.addGroup);

router.route('/:groupId')
    .get(groupHandlers.getGroup)
    .delete(groupHandlers.removeGroup)
    .put(groupHandlers.updateGroup);

router.post('/:groupId/toss', groupHandlers.tossGroup);

router.get('/:groupId/participant/:participantId/receipt', participantHandlers.getParticipantReceipt);
router.post('/:groupId/participant', participantHandlers.addParticipant);
router.delete('/:groupId/participant/:participantId', participantHandlers.removeParticipant);

module.exports = router;