const User = require('../models/User');

exports.verifyEmailPage = (req, res) => {
    res.render('emailVerification', { email: '', user_exist: '', status: '' });
};

// Controller method to process email verification form submission
exports.verifyEmail = async (req, res) => {
    console.log(req);
    const verificationCode = req.body.otp;
    const userEmail = req.session.userEmail;

    try {
        const user = new User();
        const otp = await user.getOTP(userEmail);
        console.log(otp);
        console.log(verificationCode);

        if (verificationCode != otp) {
            return res.render('verifyEmail', { error: 'Invalid verification code' });
        }
        if (req.locals.user_role == "admin"){
            res.redirect('/adminDashboard');
        }
        else {
            res.redirect('/Profile');
        }
    } catch (error) {
        console.error('Error processing email verification:', error);
        return res.status(500).send('Internal Server Error');
    }
};