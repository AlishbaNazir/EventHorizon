const User = require('../models/User');

// Controller method to process email verification form submission
exports.verifyEmail = async (req, res) => {
    // Retrieve form data from request body
    const verificationCode = req.body.verificationCode;
    const userEmail = req.session.userEmail; // Assuming you stored user's email in session during signup or login

    try {
        // Retrieve the user from the database based on their email
        const user = await User.findOne({ email: userEmail });

        // Check if the user exists
        if (!user) {
            return res.render('verifyEmail', { error: 'User not found' });
        }

        // Check if the verification code matches the one stored in the database
        if (verificationCode !== user.verificationCode) {
            return res.render('verifyEmail', { error: 'Invalid verification code' });
        }

        // Mark the email as verified in the database
        user.emailVerified = true;
        user.verificationCode = null; // Optionally, clear the verification code after successful verification
        await user.save();

        // Redirect to a success page upon successful email verification
        res.redirect('/verificationSuccess');
    } catch (error) {
        // Handle error
        console.error('Error processing email verification:', error);
        return res.status(500).send('Internal Server Error');
    }
};
