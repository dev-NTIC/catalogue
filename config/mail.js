const nodemailer = require("nodemailer");


exports.resetEmailCode = async(code) => {

    let transporter = nodemailer.createTransport({
        host: 'sav.streamsystem.com',
        port: 465,
        secure: true, // TLS requires secureConnection to be false
        auth: {
            user: "supportsav@sav.streamsystem.com",
            pass: "cc247843e22a158",
        }
    });

    let mailOptions = {
        from: "supportsav@sav.streamsystem.com",
        to: "ilyes.bourouba7@gmail.com",
        subject: "Stream App",
        text: "code : " + code,
        html: `<html>
                    <head>
                        <title>Forgot Password</title>
                    </head>
                    <body>
                        <h1>Reset Your Password</h1>
                        <p>Hi there,</p>
                        <p>You recently requested to reset your password for our app STREAMAPP. Please use the following verification code to reset your password:</p>
                        <h3>${code}</h3>
                        <p>If you did not make this request, you can safely ignore this email.</p>
                        <p>Thanks,<br>Stream support Team</p>
                    </body>
                </html>`,
    };
    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}