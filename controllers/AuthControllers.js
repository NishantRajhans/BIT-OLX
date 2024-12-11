const express = require("express");
const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const Sendmail = async (FirstName, Email, UserId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const hashId = JWT.sign(
      {
        UserId,
      },
      process.env.JWT_SECRET_KEY
    );
    const info = await transporter.sendMail({
      from: "Nishant Priyadarshi",
      to: Email,
      subject: "For Varification of Email",
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  img {
    -ms-interpolation-mode: bicubic;
  }
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #19ac05;
  }

  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a >CampusMart</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="black">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#19ac05" style="border-radius: 6px;">
                          <a href="https://campusmart-backend.onrender.com/api/v1/Auth/VerifyUser/${hashId}" 
                          target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br>${FirstName}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for SignUp for your account. If you didn't request SignUp you can safely delete this email.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">To stop receiving these emails, you can <p>unsubscribe CampusMart</p> at any time.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });
  } catch (err) {
    console.log("Error while sending Email", err);
  }
};
exports.LogIn = async (req, res) => {
  try {
    const { Email, Password, ConfirmPassword } = req.body;
    if (!Email || !Password || !ConfirmPassword) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (Password !== ConfirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }
    const User = await UserSchema.findOne({ Email: Email });
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User does not exist",
      });
    }
    if (!User.Verified) {
      return res.status(200).json({
        success: false,
        message: "User does not verified",
      });
    }
    if (!(await bcrypt.compare(Password, User.Password))) {
      return res.status(200).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const Token = await JWT.sign(
      {
        Email: Email,
        UserId: User._id,
      },
      process.env.JWT_SECRET_KEY
    );
    User.Token = Token;
    User.Password = undefined;
    return res.status(200).json({
      success: true,
      message: "User LogIn successfully",
      User: User,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: "Error In LogIn" });
  }
};
exports.SignUp = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      ConfirmPassword,
      PhoneNumber,
    } = req.body;
    if (
      !FirstName ||
      !LastName ||
      !Email ||
      !PhoneNumber ||
      !ConfirmPassword ||
      !Password
    ) {
      return res.status(200).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (Password !== ConfirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Password And Confirm Password Does Not match",
      });
    }
    const User = await UserSchema.findOne({ Email: Email });
    if (User) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const NewUser = await UserSchema.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: hashedPassword,
      Verified: false,
    });
    Sendmail(FirstName, Email, NewUser._id);
    return res.status(200).json({
      success: true,
      message: "Email send Successfully",
      NewUser: NewUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: "Error In SignUp" });
  }
};
exports.VerifyUser = async (req, res) => {
  try {
    const HashedId = req.params.id;
    const UserId = JWT.verify(HashedId, process.env.JWT_SECRET_KEY);
    const UpdateUser = await UserSchema.findByIdAndUpdate(
      UserId.UserId,
      {
        $set: {
          Verified: true,
        },
      },
      { new: true }
    );
    const filePath = path.join(__dirname, "../verify.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res
          .status(200)
          .json({ success: false, message: "Error In VerifyUser" });
      }
      return res.send(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ success: false, message: "Error In VerifyUser" });
  }
};
