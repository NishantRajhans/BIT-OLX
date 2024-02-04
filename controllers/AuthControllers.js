const express = require("express");
const UserSchema = require("../schema/UserSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
require("dotenv").config();
const Sendmail=async(FirstName,Email,UserId)=>{
  try{
    const transporter= nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      }
    })
    const hashId=JWT.sign({
      UserId
    },process.env.JWT_SECRET_KEY);
    let info=await transporter.sendMail({
      from:'Nishant Priyadarshi',
      to:Email,
      subject:"For Varification of Email",
      html:`
      <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
        <header className="py-8 flex justify-center w-full">
          <a href="#">
            <img
              src="https://www.tailwindtap.com/_next/static/media/nav-logo.9a469dd4.svg"
              alt="tailwindtaplogo"
            />
          </a>
        </header>
        <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
              THANKS FOR SIGNING UP!
            </div>
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>
        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700 ">Hello ${FirstName},</h2>
          <p className="mt-2 leading-loose text-gray-600 ">
            Please use the following Link To verify your E-mail Address
          </p>
          <p className="mt-4 leading-loose text-gray-600">
            This passcode will only be valid for the next
            <span className="font-bold"> 2 minutes</span> . If the passcode does
            not work, you can use this login verification link:
          </p>
          <a href="https://bitolx-backend.onrender.com/api/v1/Auth/VerifyUser/${hashId} className="px-6 py-2 mt-6 text-sm font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
            Verify email
          </a>
          <p className="mt-8 text-gray-600">
            Thank you, <br />
            Infynno Team
          </p>
        </main>
        <p className="text-gray-500  px-5 sm:px-10 mt-8">
          This email was sent from{" "}
          <a
            href="mailto:sales@infynno.com"
            className="text-[#365CCE] hover:underline"
            alt="sales@infynno.com"
            target="_blank"
          >
            bitolx@infynno.com
          </a>
          . If you&apos;d rather not receive this kind of email, you can{" "}
          <a href="#" className="text-[#365CCE] hover:underline">
            unsubscribe
          </a>{" "}
          or{" "}
          <a href="#" className="text-[#365CCE] hover:underline">
            manage your email preferences
          </a>
          .
        </p>
        <footer className="mt-8">
          <div className="bg-gray-300/60 h-[200px] flex flex-col gap-3 justify-center items-center">
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-[#365CCE] font-semibold tracking-wide text-lg">
                Get in touch
              </h1>
              <a
                href="mailto:sales@infynno.com"
                className="text-gray-500"
                alt="sales@infynno.com"
              >
                bitolx@infynno.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <a href="#_">
                <FacebookIcon />
              </a>
              <a href="#_">
                <LinkedinIcon />
              </a>
              <a href="#_">
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div className="bg-[#365CCE] py-5 text-white text-center">
            <p className="mt-3 ">
              © {new Date().getFullYear()} TailwindTap. All Rights Reserved.
            </p>
          </div>
        </footer>
      </section>
    </div>
      `
    })
  }catch(err){
    console.log("Error while sending Email",err)
  }
}
exports.LogIn = async (req, res) => {
    try{
        const {Email,Password,ConfirmPassword}=req.body;
        if(!Email ||!Password || !ConfirmPassword){
            return res.status(200).json({
                success: false,
                message: "All fields are required",
              });
        }
        if(Password!==ConfirmPassword){
            return res.status(200).json({
                success: false,
                message: "Password and Confirm Password do not match",
              });
        }
        const User=await UserSchema.findOne({Email:Email})
        if(!User){
            return res.status(200).json({
                success: false,
                message: "User does not exist",
              });
        }
        if(!User.Verified){
          return res.status(200).json({
            success: false,
            message: "User does not verified",
          });
        }
        if(! await bcrypt.compare(Password, User.Password)){
            return res.status(200).json({
                success: false,
                message: "Password is incorrect",
              });
        }
        const Token= await JWT.sign({
            Email:Email,
            Password:Password,
        },process.env.JWT_SECRET_KEY)
        User.Token=Token
        User.Password=undefined
        return res.status(200).json({
            success: true,
            message: "User LogIn successfully",
            User:User
          });
    }catch(err){
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
    const hashedPassword = await bcrypt.hash(Password,10);
    const NewUser = await UserSchema.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: hashedPassword,
      Verified: false,
    });
    Sendmail(FirstName,Email,NewUser._id);
    return res
      .status(200)
      .json({ success: true, message: "Email send Successfully" ,NewUser:NewUser});
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: "Error In SignUp" });
  }
};
exports.VerifyUser=async(req,res)=>{
    try{
      const HashedId=req.params.id;
      const UserId= JWT.verify(HashedId,process.env.JWT_SECRET_KEY)
      const UpdateUser=await UserSchema.findByIdAndUpdate(UserId.UserId,{
        $set:{
          Verified:true
        }
      },{new:true})
        return res.status(200).json({
            success:true,
            message:"User verified successfully",
            UpdateUser:UpdateUser
        })

    }catch(err){
        console.log(err);
    return res.status(200).json({ success: false, message: "Error In VerifyUser" });
    }
}
