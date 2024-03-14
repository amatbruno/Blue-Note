import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function SendEmail(subject, template) {
    try {
        const wasSent = resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'pacomermela080@gmail.com',
            subject: subject,
            html: template
        });

        if(wasSent) return true 

        return false
    } catch (error) {
        return false
    }
}