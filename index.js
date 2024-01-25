const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

const ContactInfo = require("./models/ContactInfo");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://heyaastranger.github.io",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204, // Respond with 204 No Content for OPTIONS requests
  })
);

app.use(bodyParser.json());

app.use("/about", (req, res, next) => {
  res.json({ message: "Hi Gagan this is my first MangoDB lecture" });
});

app.use("/ContactMe", async (req, res, next) => {
  const { firstName, lastName, emailID, Message } = req.body;
  try {
    const newContactInfo = new ContactInfo({
      firstName: firstName, // name,
      lastName: lastName,
      emailID: emailID,
      Message,
    });

    await newContactInfo.save();
    res.status(201).json({
      message: "Thank you for Reaching Out",
    });
  } catch (error) {
    res.status(500).json({ Message: "Something went wrong" });
  }
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.hsil95h.mongodb.net/PORTFOLIO`
  )
  .then(() => {
    console.log("Connection Successful");
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log("Connection Failed", error);
  });
