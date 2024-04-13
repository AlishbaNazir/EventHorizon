
const User = require('../models/User');

const user = new User();

// Controller method to render the landing page
exports.landingPage = (req, res) => {
    // Check if the user is authenticated
    if (req.session.isLoggedIn) {
        // If authenticated, render the landing page with user-specific content
        // You may fetch user data or perform other actions here
        res.render('landingPage', { isAuthenticated: true, user: req.user });
    } else {
        // If not authenticated, render the landing page with general content
        res.render('landingPage', { isAuthenticated: false });
    }
};