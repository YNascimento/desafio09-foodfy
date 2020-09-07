const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "749566fafd77f6",
      pass: "37d7c862d627b3"
    }
})