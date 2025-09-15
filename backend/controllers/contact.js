const Contact = require('../models/Contact.js');

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const { firstName, lastName, email, color, birthday } = req.body;

    // Validate the body
    if (!firstName || !lastName || !email || !color || !birthday) {
        return res.status(400).json({ error: 'First name, last name, email, favorite color, and birthday are required' });
    }

    // Validate the email to make sure its an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Set up the contact "template" object
    let contact = {};
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.email = email.toLowerCase();
    contact.color = color;
    contact.birthday = new Date(birthday);

    const existingContact = await Contact.findOne({ email: contact.email });
    // Check if a contact with that email already exists
    if (existingContact)
        return res.status(400).json({ error: 'A contact with this email already exists' });

    // Attempt to add the contact
    try {
        let contactModel = new Contact(contact);
        await contactModel.save();
        res.json(contactModel);
    } catch (err) {
        res.status(500).json({ error: 'Unable to add new contact' });
    }
}

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
}

const getSingleByEmail = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = await Contact.findOne({ email: req.params.email});
        if (!contact)
            throw Error()
        res.status(200).json({contact});
    } catch (err) {
        res.status(500).json({ error: 'That contact does not exist' });
    }
}

const getSingleById = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contact = await Contact.findOne({ _id: req.params.id});

        if (!contact)
            return res.status(400).json({ error: 'That contact does not exist' });

        return res.status(200).json({contact});
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}

// If you're updating by email, you can't change the email on the user.
const updateByEmail = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        console.log(req.body);
        const updateFields = {};
        if (firstName !== undefined) updateFields.firstName = firstName;
        if (lastName !== undefined) updateFields.lastName = lastName;
        if (favoriteColor !== undefined) updateFields.favoriteColor = favoriteColor;
        if (birthday !== undefined) updateFields.birthday = birthday;

        if (Object.keys(updateFields).length == 0)
            return res.status(400).json({error: 'No updated fields provided.'});

        await Contact.updateOne({ email: email}, {$set: updateFields});
        return res.status(200).json({error: `Updated contact with email: ${email}`});
    } catch (err) {
        console.log(err);
        return res.status(404).json({error: 'No contact found with that email. No delete occurred.'});
    }
}

const updateById = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const { firstName, lastName, emailUpdate, favoriteColor, birthday, id } = req.body;

        const updateFields = {};
        if (firstName !== undefined) updateFields.firstName = firstName;
        if (lastName !== undefined) updateFields.lastName = lastName;
        if (emailUpdate !== undefined) updateFields.email = emailUpdate;
        if (favoriteColor !== undefined) updateFields.favoriteColor = favoriteColor;
        if (birthday !== undefined) updateFields.birthday = birthday;

        if (Object.keys(updateFields).length == 0)
            return res.status(400).json({error: 'No updated fields provided.'});

        await Contact.updateOne({ _id: id}, {$set: updateFields});
        return res.status(200).json({Response: `Updated contact with id: ${id}`});
    } catch (err) {
        return res.status(404).json({error: 'No contact found with that id. No delete occurred.'});
    }
}

const deleteByEmail = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const {email} = req.body;
        await Contact.deleteOne({ email: email});
        return res.status(200).json({error: `Deleted contact with email: ${email}`});
    } catch (err) {
        return res.status(400).json({error: 'No contact found with that email. No delete occurred.'});
    }
}

const deleteById = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const {id} = req.body;
        await Contact.deleteOne({ _id: id});
        return res.status(200).json({error: `Deleted contact with id: ${id}`});
    } catch (err) {
        return res.status(400).json({error: 'No contact found with that id. No delete occurred.'});
    }
}

module.exports = {
    createContact, 
    getAll, 
    getSingleByEmail,
    getSingleById,
    deleteByEmail,
    deleteById,
    updateByEmail,
    updateById
}