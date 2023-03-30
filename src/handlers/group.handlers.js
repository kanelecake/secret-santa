const Group = require('./../models/group.model');
const User = require('./../models/user.model');

// add new group with name (required)
// and description (not required)
const addGroup = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description || '';

    if (!name || name === '') {
        return res.status(400).send({ message: `Field 'name' is required!` });
    }
    
    // create a new group
    const group = await Group.create({ name, description });
    return res.send(group.id.toString());
};

// get full information about group by id
// with information about users
const getGroup = async (req, res) => {
    const id = req.params.groupId;

    const group = await Group.findOne({ attributes: ['id', 'name', 'description', 'participants'], where: {id} });
    if (group.length === 0)
        return res.sendStatus(404);

    const participantsArr = [];
    const participants = group.participants.split(', ');
    for (let key in participants) {
        if (participants[key] !== 'n') {
            participantsArr.push(await User.findOne({ attributes: ['id', 'name', 'wish', 'recipient'], where: { id: participants[key] } }))
        }
    }

    group.participants = participantsArr;
    return res.send(group);
};

// remove group by id
const removeGroup = async (req, res) => {
    const id = req.params.groupId;
    await Group.destroy({ where: {id} });
    return res.sendStatus(200);
};

// edit group by id
// editable fields: name, description
const updateGroup = async (req, res) => {
    const id = req.params.groupId;
    const name = req.body.name;
    const description = req.body.description;
    
    const group = await Group.findOne({ where: {id} });
    await Group.update({ name: name || group.name, description: description || group.description }, { where: {id} });

    return res.sendStatus(200);
};

// get short information about groups
const getAllGroups = async (req, res) => {
    const groups = await Group.findAll({ attributes: ['id', 'name', 'description'] });
    return res.send(groups);
};

// Used to make toss in group
// Toss can be make, when more than 2 user in group
const tossGroup = async (req, res) => {
    const id = req.params.groupId;
    const group = await Group.findOne({ where: {id} });

    const participants = group.participants.split(', ');
    const recipients = {}; // key is participant, value is recipient
    const validParticipants = [];

    for (let key in participants) {
        if (participants[key] !== 'n') {
            validParticipants.push(participants[key]);
        }
    }

    // get recipient for user
    const recipientsArr = validParticipants;
    const recipientCount = recipientsArr.length;

    let currentParticipant = 0;
    while (currentParticipant < recipientCount) {
        // get random recipient key
        const recipientKey = Math.floor(Math.random() * recipientCount);

        const participant = validParticipants[currentParticipant];
        const recipient = recipientsArr[recipientKey];
        console.log(recipientKey);

        if (participant === recipient && recipient !== 'n')
            continue;
        
        recipients[participant] = recipient;
        recipientsArr[recipientKey] = 'n';

        console.log('p:', participant, ', r:', recipient);

        currentParticipant += 1;
    }

    // NOT RELEASED!!!!!
    return res.send(recipients);
};

module.exports = {
    addGroup,
    getGroup,
    removeGroup,
    updateGroup,
    getAllGroups,
    tossGroup,
};