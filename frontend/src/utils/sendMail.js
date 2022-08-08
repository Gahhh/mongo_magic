const SMTP_AUTH = 'DE64FDF6312E0B8B7067F5615323763BD58B';

const sendMail = async(toEmail, Body) => {
    try {
        const email = await window.Email.send({
        Host:'smtp.elasticemail.com',
        Username: "mongomagic9323@gmail.com",
        Password: SMTP_AUTH,
        To: `${toEmail}`,
        From: `mongomagic9323@gmail.com`,
        Subject:`Do Not Reply`,
        Body:`Dear user, Your Message '${Body}' is received and we will get back to you as soon as possible. Thank you for your patience. 
        <br>Regards, <br>G'Tracker Support Team`
    })
    return email;
} catch (error) {
}
}

export default sendMail;