const express = require('express');
const route = express.Router();
const fs = require('fs').promises;

route.get('/', async (req, res) => {
    const professional = {
        professionalName:"Teilani Norton",
        primaryDescription:"A future PhD student",
        base64Image: await getBase64FromFile('../frontend/images/image.jpg'),
        workDescription1: "Work1",
        workDescription2: "Work2",
        linkTitleText: "Links",
        nameLink: {
            firstName: "Teilani",
            url: "/"
        },
        linkedInLink: {
            text: "LinkedIn",
            link: "https://linkedin.com"
        },
        githubLink: {
            text: "Github",
            link: "https://github.com"
        }
    }

    res.status(200).json(professional);
});

async function getBase64FromFile(filePath) {
    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer.toString('base64');
}

module.exports = route;