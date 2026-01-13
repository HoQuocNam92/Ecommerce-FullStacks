import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = (to, subject, html) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        html
    });
}
export default sendEmail;