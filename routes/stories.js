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
