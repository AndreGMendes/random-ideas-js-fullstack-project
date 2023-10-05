const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea')

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ 
      success: true, 
      data: ideas 
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      error: 'Something went wrong' 
    });
    console.log(error);
  }
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    res.json({ 
      success: true, 
      data: idea 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: 'Something went wrong'
    });
    console.log(error);
  }
});

// Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username
  });
  console.log(idea);
  try {
    const savedIdea = await idea.save();
    res.json({ 
      success: true, 
      data: savedIdea 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: 'Something went wrong'
    });
    console.log(error);
  } 
});

// Update idea
router.put('/:id', async (req, res) => {
  try {

    const idea = await Idea.findById(req.params.id);

    // MATCH THE USERNAMES 
    if (idea.username === req.body.username) { 

      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id, 
        {
          $set:{
            text: req.body.text,
            tag: req.body.tag
          }
        },
        {
          new: true
        }
      );
      return res.json({ 
        success: true, 
        data: updatedIdea 
      });
    }

    // USERNAMES DO NOT MATCH
    res.status(403).json({ 
      success: false, 
      data: 'You are not authorized to update this resource'
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: 'Something went wrong'
    });
    console.log(error);
  }
});

// Delete idea
router.delete('/:id', async (req, res) => {
  try {

    const idea = await Idea.findById(req.params.id);

    // MATCH THE USERNAMES 
    if (idea.username === req.body.username) {
      
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ 
        success: true, 
        data: {} 
      });
    }

    // USERNAMES DO NOT MATCH
    res.status(403).json({ 
      success: false, 
      data: 'You are not authorized to delete this resource'
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      data: 'Something went wrong'
    });
    console.log(error);
  }
});


module.exports = router;
