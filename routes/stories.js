const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

const Story = require('../models/Story');

// @desc  Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc  Process add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('dashboard');
  } catch (error) {
    console.log(error);
    res.render('error/500');
  }
});

// @desc  Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();
    console.log(stories);
    res.render('stories/index', {
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render('error/500');
  }
});

module.exports = router;
