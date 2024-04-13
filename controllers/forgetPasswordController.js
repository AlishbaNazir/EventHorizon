const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.forgetPasswordPage = (req, res) => {
    res.render('forgetPassword', { email: '', user_exist: '', status: '' });
};

exports.resetPassword = async (req, res) => {
    try {
        // Retrieve token and new password from request body
        const otp = req.body.otp;
        const password = req.body.password;
        const email = req.body.email;

        const user = new User();

        // Check if OTP is correct
        const results = await user.getOTP(email);
        if (results.length > 0) {
            if (results[0].otp == otp) {
                // Update the user's password
                await user.updatePassword(email, password);
                // Redirect to the sign-in page
                return res.render('signIn', { error: '' });
            } else {
                // Incorrect OTP, render forget-password page with error message
                return res.render('forgetPassword', { email: email, user_exist: 'True', status: 'Fail' });
            }
        } else {
            // No OTP found, render forget-password page with error message
            return res.render('forgetPassword', { email: email, user_exist: 'True', status: '' });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.sendOTP = async (req, res) => {
    try {
        // Retrieve email from request body
        const email = req.body.email;

        const user = new User();

        const emailResults = await user.checkEmailDuplicate(email);
        if (emailResults.length > 0) {
            // Generate a random OTP (e.g., 6-digit number)
            const OTP = Math.floor(100000 + Math.random() * 900000);

            // Set up nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '', // Your Gmail email address
                    pass: '' // Your Gmail password or App password if you have 2-step verification enabled
                }
            });

            // Email options
            const mailOptions = {
                from: '', // Your Gmail email address
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for verification is: ${OTP}`
            };

            // Send email with OTP
            transporter.sendMail(mailOptions, async function(error, info) {
                if (error) {
                    console.error('Error sending OTP email:', error);
                    // Handle error, e.g., render an error page
                    return res.status(500).send('Internal Server Error');
                } else {
                    // Save the OTP to the database
                    const results = await user.addOTP(email, OTP);
                    if (results) {
                        // Redirect to a page where the user can enter the OTP for verification
                        return res.render('forgetPassword', { email: email, user_exist: 'True', status: '' });
                    } else {
                        // Handle error, e.g., render an error page
                        return res.status(500).send('Internal Server Error');
                    }
                }
            });
        }
        else {
            // User with this email does not exist, render forget-password page with error message
            return res.render('forgetPassword', { email: '', user_exist: 'False', status: '' });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.changePassword = (req, res) => {
    const OTP = req.body.otp;

    if (OTP == '') {
        return this.sendOTP(req, res);
    }
    else {
        return this.resetPassword(req, res);
    }
};