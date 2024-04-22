const mongoose = require("mongoose");

// video url, video title, views count , uploded date, video description, channel logo,channel subscribers,channel name,saved,video thumbnail,category,
const videoDetails = new mongoose.Schema({
  video_url: {
    type: String,
  },
  video_title: {
    type: String,
  },
  view_count: {
    type: String,
  },
  video_description: {
    type: String,
  },
  video_uploded_date: {
    type: String,
  },
  channel_logo: {
    type: String,
  },
  channel_subscribers: {
    type: String,
  },
  channel_name: {
    type: String,
  },
  savedstatus: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail_url: {
    type: String,
  }

});

const videos = mongoose.model("videosDetails", videoDetails);
module.exports = videos;