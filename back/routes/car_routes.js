const express = require("express");
const OEM = require("../models/OEM");
const Post = require("../models/Cars");
const auth = require("../middleware/authMiddleware");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  // console.log("coming in postroute");
  try {
    const posts = await Post.find({});
    if (posts.length == 0) {
      await res.status(200).json({ message: "cars not found" });
    }
    await res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
postRouter.get("/get/:postID", async (req, res) => {
    const  postID  = req.params.postID;
    console.log(postID)
    try {
      const post = await Post.findOne({ _id: postID });
      // console.log(recipe);
      if (post) {
        return res.status(200).json({ Messsage: "post",post});
      } else {
        return res.status(404).json({ msg: `movie not found...!!` });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });




postRouter.get("/oem", async (req, res) => {
    try {
      const post = await OEM.find({ });
      // console.log(recipe);
      if (post) {
        return res.status(200).json({ Messsage: "OEM",post});
      } else {
        return res.status(404).json({ msg: `car data not found...!!` });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  postRouter.get("/oem/:postID", async (req, res) => {
    const  postID  = req.params.postID;
    console.log(postID)
    try {
      const post = await OEM.findOne({ _id: postID });
      // console.log(recipe);
      if (post) {
        return res.status(200).json({ Messsage: "post",post});
      } else {
        return res.status(404).json({ msg: `movie not found...!!` });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  postRouter.post("/oem/add",  async (req, res) => {
    try {
      const {
        name,
        year,
        price,
        availableColors,
        mileage,
        power,
        maxSpeed,
      } = req.body;
console.log(req.body)
      
      const newOEMData = {
        name,
        year,
        price,
        availableColors,
        mileage,
        power,
        maxSpeed
     
      };
      const newOEM = new OEM(newOEMData);
      await newOEM.save();
  
      return res.status(201).json({ Message: "OEM data added", newOEM });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });







postRouter.post("/add", auth, async (req, res) => {

  try {
    const {
        name,
      km,
      scratches,
      originalPaint,
      accidents,
      buyers,
      registrationPlace,
    } = req.body;
    // console.log(req.body,"byyy")
    const createdBy = req.body.userID;
    // console.log(req.body,"bodyyyy")
    // console.log(createdBy, "cretor");
    const newPostData = {
        name,
        km,
        scratches,
        originalPaint,
        accidents,
        buyers,
        registrationPlace,
    
      // createdAt: formatDate(Date.now()),
      createdBy
    };
    const newPost = await Post(newPostData);
    await newPost.save();
    // await createdBy.populate()
    return res.status(200).json({ msg: "New car added", newPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



postRouter.delete("/:postID", auth, async (req, res) => {
    const { postID } = req.params;
    const post = await Post.findOne({ _id: postID });
    console.log(post,"finded")
    try {
      if (post) {
        const deletedPost = await Post.findByIdAndDelete({
          _id: postID,
        });
        return res.status(200).json({ msg: "Car deleted", deletedPost});
      } else {
        return res.status(404).json({ msg: `car not found...!!` });
      }
    } catch (error) {
        console.log*error
      return res.status(500).json({ error: error.message });
    }
  });

  postRouter.get("/inventory",auth, async (req, res) => {
    const  userID  = req.body.userID;
  
    try {
      const post = await Post.find({ createdBy: userID });
      // console.log(recipe);
      if (post) {
        return res.status(200).json({ Messsage: "post",post});
      } else {
        return res.status(404).json({ msg: `car not found...!!` });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });



module.exports = postRouter;
