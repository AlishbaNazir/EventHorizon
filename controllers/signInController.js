
const User = require('../models/User');


// Controller method to render the sign-in page
exports.signInPage = (req, res) => {
    res.render('signIn', {error: ''}); 
};

// Controller method to process sign-in form submission
exports.signIn = async (req, res) => {
    // Retrieve username and password from request body
    const username = req.body.username;
    const password = req.body.password;

    const user = new User();

    try {
        const userResult = await user.authenticate(username, password);
        
        if (userResult) {
            // Authentication successful, redirect to dashboard or homepage
            req.session.isLoggedIn = true;
            req.session.username = username;
            res.redirect('/');
        } else {
            // Authentication failed, render sign-in page with error message
            res.render('signIn', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).send('Internal Server Error');
    }
};