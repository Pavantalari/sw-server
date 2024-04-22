const express = require("express");
const mongoose = require("mongoose");
const videos = require("./models/VideoDetails");
const jwtTokenMiddleware = require("./middleware/jwtAuth"); 
const bcrypt = require("bcrypt"); 
const User = require("./models/User");
const jwt = require("jsonwebtoken"); 
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://talaripavan155:mteagle155@cluster0.sb1xeyv.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected....!!");
  })
  .catch((err) => {
    console.error(err);
  });

// Authentication here to generate the token using below username and password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to send video details, protected by JWT token verification middleware
app.post("/send_video_details", jwtTokenMiddleware.verifyToken, async (req, res) => {
    try {
      const sendVideoDetails = await videos.create(req.body);
      return res.status(201).json({ message: "Video details saved successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get all video details
app.get("/get-video-details", async (req, res) => {
  try {
    const videoDetails = await videos.find({});
    res.status(200).json(videoDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get individual video details
app.get("/individualvideo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videos.findById({ _id: id });
    res.status(200).json(video);
  } catch (error) {
    console.log(error);
  }
});


// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// api to get trending videos
app.get("/trendingvideos", async (req, res) => {
  try {
    const trendingvideos = await videos.find({ category: "Trending" });
    return res.status(200).json({ trendingvideos: trendingvideos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// api to get gaming videos
app.get("/gamingvideos", async (req, res) => {
  try {
    const gamingvideos = await videos.find({ category: "Gaming" });
    return res.status(200).json({ gamingvideos: gamingvideos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// api to get saved videos
app.get("/savedvideos", async (req, res) => {
  try {
    const savedvideos = await videos.find({ savedstatus: "Saved" });
    return res.status(200).json({ savedvideos: savedvideos });
  } catch (error) {
    console.log(error);
  }
});

// api to update the saved status
app.put("/videos/:id/saved", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { savedStatus } = req.body;
  console.log(savedStatus);
  try {
    const updatedVideo = await videos.findByIdAndUpdate(
      id,
      { savedStatus },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json("video not found");
    }

    res.json(updatedVideo);
  } catch (error) {
    console.log(error);
  }
});

const port = 5555;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
