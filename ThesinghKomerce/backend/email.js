import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

class Email {
  constructor(html, to) {
    this.to = to;
    this.html = html;
    this.from = `thes.1712502@gct.ac.in`;
  }

  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Send the actual email
  async send(subject, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', this.html);
  }

  async sendOrder() {
    await this.send('orderConfirmation', this.html);
  }
}

export {Email};
