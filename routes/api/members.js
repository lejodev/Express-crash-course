const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');


// Get all members
router.get('/', (req, res) => {
    res.json(members);
})

// Get a single member
router.get('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); // Filter used to get the specific member by its id
    } else {
        res.status(400).json({ err: `There are no user with id = ${req.params.id}`});
    }

});

router.post('/', (req, res) => {

    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    }

    // Checcking name and email are sent in the request
    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg : 'name or email not present in query'});
    } else {
        members.push(newMember);
        res.json(members);
    }

});

// Update memeber
router.put('/:id', (req, res) => {

    const found = members.some((member) => member.id === parseInt(req.params.id));

    if (found) {

        const updMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                {
                    member.name = updMember.name ? updMember.name : member.name;
                    member.email = updMember.email ? updMember.email : member.email;
                    member.status = updMember.status ? updMember.status : member.status;

                    res.json({msg : `Member with id = ${member.id} updated`, member})
                }
            }
        });


    } else {
        res.status(400).json({err : `${err} Id not found`})
    }

});

router.delete('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({mesage : `Member with id ${req.params.id} deleted`, members : members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({err :`Id ${req.params.id} not found`});
    }
})

module.exports = router;