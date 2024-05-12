const User = require('../models/User');
const nodemailer = require('nodemailer');

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

    const user = new User();

    try {

        // Create new user with hashed password
        await user.createUser(username, email, password, role, first_name, last_name, phone_number, date_of_birth, address);

        try {
            // Generate a random OTP (e.g., 6-digit number)
            const OTP = Math.floor(100000 + Math.random() * 900000);

            // Set up nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'usmanamjad495@gmail.com', // Your Gmail email address
                    pass: 'gcbg jmxx cpkp vpdh' // Your Gmail password or App password if you have 2-step verification enabled
                }
            });

            // Email options
            const mailOptions = {
                from: 'usmanamjad495@gmail.com', // Your Gmail email address
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
                    // Save the OTP somewhere
                    user.addOTP(email, OTP);
                    req.session.userEmail = email;
                    // Redirect to a page where the user can enter the OTP for verification
                    res.redirect('/VerifyEmail');
                }
            });
        } catch (error) {
            console.error('Error sending OTP:', error);
            return res.status(500).send('Internal Server Error');
        }

    } catch (error) {
        // Handle error
        console.error('Error processing sign-up:', error);
        return res.status(500).send('Internal Server Error');
    }
};