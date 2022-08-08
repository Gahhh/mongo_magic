const SMTP_AUTH = 'DE64FDF6312E0B8B7067F5615323763BD58B';


const sendSolveEMail = async(toEmail, Body) => {
  try {
    const email = await window.Email.send({
      Host:'smtp.elasticemail.com',
      Username: "mongomagic9323@gmail.com",
      Password: SMTP_AUTH,
      To: `${toEmail}`,
      From: `mongomagic9323@gmail.com`,
      Subject:`Do Not Reply`,
      Body:`Dear user, Thank you for your question. Here is our solution: ${Body}. Thank you for your patience. 
        <br>Regards, <br>G'Tracker Support Team`
    })
    return email;
  } catch (error) {
  }
}

export default sendSolveEMail;