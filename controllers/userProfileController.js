const User = require('../models/User');

exports.userProfile = async (req, res) => {
    res.render('userProfile', {error: ''});
}

exports.saveProfile = async (req, res) => {
    // Retrieve form data from request body
    const newProfile = new Profile({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        bio: req.body.bio,
        birthday: req.body.birthday,
        country: req.body.country,
        phone: req.body.phone,
        website: req.body.website
    });
  
    try {
      await profile.save();
      res.redirect("/userProfile");
    } catch (err) {
      res.json({ message: err });
    }
}
