const Contact = require('../models/Contact.js');

const createContact = async (req, res) => {

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
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
}

const getSingleByEmail = async (req, res) => {
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
    try {
        const contact = await Contact.findOne({ _id: req.params.id});

        if (!contact)
            return res.status(400).json({ error: 'That contact does not exist' });

        return res.status(200).json({contact});
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports = {
    createContact, 
    getAll, 
    getSingleByEmail,
    getSingleById
}