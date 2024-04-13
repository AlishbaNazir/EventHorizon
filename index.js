const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');

app.use(
  session({
    secret: 'SomeSuperLongHardToGuessSecretString',
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/SignIn');
    }
  });
});

// Set views directory and template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import controllers
const signInController = require('./controllers/signInController');
const signUpController = require('./controllers/signUpController');
const forgetPasswordController = require('./controllers/forgetPasswordController');
const landingPageController = require('./controllers/landingPageController');
const emailVerificationController = require('./controllers/emailVerificationController'); // Add this line

// Use body parser for form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.json());

// Route handlers using controllers
app.get('/SignIn', signInController.signInPage);
app.post('/SignIn', signInController.signIn);

app.get('/SignUp', signUpController.signUpPage);
app.post('/SignUp', signUpController.signUp);

app.get('/ForgetPassword', forgetPasswordController.forgetPasswordPage);
app.post('/ForgetPassword/ChangePassword', forgetPasswordController.changePassword);

app.get('/VerifyEmail', emailVerificationController.verifyEmailPage); // Add this line
app.post('/VerifyEmail', emailVerificationController.verifyEmail); // Add this line

app.get('/', landingPageController.landingPage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
