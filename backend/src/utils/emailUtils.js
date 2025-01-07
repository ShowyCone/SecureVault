import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'securevault22@gmail.com',
      pass: process.env.APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: '"SecureVault" <securevault22@gmail.com>',
    to,
    subject,
    text,
  })
}

export default sendEmail
