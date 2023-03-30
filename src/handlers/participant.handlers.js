const Group = require('./../models/group.model');
const User = require('./../models/user.model');

// get information about user gift receiver
// for current user in group
const getParticipantReceipt = async (req, res) => {
    const id = req.params.participantId;
    const participant = await User.findOne({ where: {id} });
    const receipt = await User.findOne({ attributes: ['id', 'name', 'wish'], where: { id: participant.recipient }});

    if (!receipt.id)
        return res.sendStatus(404);
    
    return res.send(receipt);
};

 // add new participant to group with id
// fields: name (required), wish (not required)
const addParticipant = async (req, res) => {
    const id = req.params.groupId;

    const name = req.body.name;
    const wish = req.body.wish || '';

    if (!name || name === '') {
        return res.status(400).send({ message: `Field 'name' is required!` });
    }

    // create a new user
    const participant = await User.create({ name, wish });

    // update group information
    const group = await Group.findOne({ where: { id } });
    const participants = group.participants ? group.participants + ', ' : '';
    
    await Group.update({ participants: `${participants}${participant.id}` }, { where: { id: id } });

    return res.send(participant.id.toString());
};

// remove user from group
const removeParticipant = async (req, res) => {
    const id = req.params.groupId;
    const partId = req.params.participantId;

    const group = await Group.findOne({ where: { id } });
    await Group.update({ participants: group.participants.replace(partId, 'n')}, { where: {id} });

    return res.sendStatus(200);
};

module.exports = {
    getParticipantReceipt,
    addParticipant,
    removeParticipant,
};