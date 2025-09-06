const mongoose = require('mongoose');

const nameLinkModel = new mongoose.Schema({
    firstName: {
        type: String
    },
    url: {
        type: String
    }
})

const linkedInLinkModel = new mongoose.Schema({
    text:{
        type: String
    },
    link:{
        type: String
    }
})

const githubLinkModel = new mongoose.Schema({
    text:{
        type: String
    },
    link:{
        type: String
    }
})

const professional = new mongoose.Schema({
    professionalName:{
        type: String
    },
    primaryDescription:{
        type: String
    },
    base64Image:{
        type: Buffer
    },
    workDescription1:{
        type: String
    },
    workDescription2:{
        type: String
    },
    linkTitleText:{
        type: String
    },
    nameLink: nameLinkModel,
    linkedInLink: linkedInLinkModel,
    githubLink: githubLinkModel
})

module.exports = Professional = mongoose.model('professional', professional);