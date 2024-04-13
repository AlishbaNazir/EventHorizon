const User = require('../models/User');

// Controller method to render the sign-up page
exports.signUpPage = (req, res) => {
    res.render('signUp', {error: ''}); 
};


// Controller method to process sign-up form submission
exports.signUp = async (req, res) => {
    // Retrieve form data from request body
    const role = req.body.role;
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.emailField;
    const phone_number = req.body.numberField;
    const date_of_birth = req.body.dateOfBirth;
    const address = req.body.addressField;
    const username = req.body.username;
    const password = req.body.passwordField;

    // Create a new instance of the User model
    const user = new User();

    try {
        // Check if email is already in use
        const emailResults = await user.checkEmailDuplicate(email);
        if (emailResults.length > 0) {
            // User with this email already exists, render sign-up page with error message
            return res.render('signUp', { error: 'Email already in use' });
        }

        // Check if username is already in use
        const usernameResults = await user.checkUserNameDuplicate(username);
        if (usernameResults.length > 0) {
            // User with this username already exists, render sign-up page with error message
            return res.render('signUp', { error: 'Username already in use' });
        }

        // Create new user with hashed password
        await user.createUser(username, email, password, role, first_name, last_name, phone_number, date_of_birth, address);

        // Redirect to sign-in page upon successful sign-up
        res.redirect('/SignIn');
    } catch (error) {
        // Handle error
        console.error('Error processing sign-up:', error);
        return res.status(500).send('Internal Server Error');
    }
};