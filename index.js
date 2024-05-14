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
const adminDashboardController = require('./controllers/adminDashboardController');
const eventController = require('./controllers/eventController');
const userProfileController = require('./controllers/userProfileController');

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

app.get('/VerifyEmail', emailVerificationController.verifyEmailPage);   
app.post('/VerifyEmail', emailVerificationController.verifyEmail);

app.get('/adminDashboard' , adminDashboardController.adminDashboard);
app.post('/adminDashboard',adminDashboardController.adminDashboard);

app.get('/addEvent', eventController.eventPage);
app.post('/create', eventController.event);

app.get('/profile', userProfileController.userProfile);
// app.post('/profile', userProfileController.saveProfile);
//2. CRUD OPERATIONS

//create
app.post("/create", async (req, res) => {
  console.log(req.body);
  const event = new eventModule({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    time: req.body.time,
    mode: req.body.mode,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    venue: req.body.venue,
    category: req.body.category,
    registerationFee: req.body.registerationFee,
    cashPrice: req.body.cashPrice,
    contact: req.body.contact
  });

  try {
    await event.save();
    res.redirect("/viewevents");
  } catch (err) {
    res.json({ message: err });
  }
});

//show all events for clients

app.get("/viewevents", async (req, res) => {
  try {
    const events = await eventModule.find();

    eventModule.find({}).then((data) => {
      res.render("showevent", { event: data });
    })
  } catch (err) {
    res.json({ message: err });
  }
});


// app.get("/fetchdetails/:id",function(req,res){
//   try{
//     eventModule.findById(req.params.id).then((data)=>{
//       res.render("details",{event:data})
//     })
//   }
//   catch(err){
//     res.json({ message: err });
//   }


// });

// //read
// app.get("/events/:eventId", async (req, res) => {
//   try {
//     const event = await eventModule.findById(req.params.eventId);
//     // res.json({ event });
//     res.render("details")
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// //update
// app.post("/events/:eventId", async (req, res) => {
//   const {
//     name,
//     description,
//     photo,
//     time,
//     mode,
//     dateStart,
//     dateEnd,
//     venue,
//     category,
//     registerationFee,
//     cashPrice,
//     contact
//   } = req.body;
//   try {
//     const updatedEvent = await eventModule.findByIdAndUpdate(
//       req.params.eventId,
//       {
//         name,
//         description,
//         photo,
//         time,
//         mode,
//         dateStart,
//         dateEnd,
//         venue,
//         category,
//         registerationFee,
//         cashPrice,
//         contact
//       }
//     );

//     if (!updatedEvent) {
//       res.json({ message: "Event not found" });
//     }

//     updatedEvent = await updatedEvent.save();
//     res.redirect("/viewevents");
//   } catch (err) {
//     res.redirect("/viewevents");
//   }
// });

// //delete
// app.post("/deleteEvents/:eventId", async (req, res) => {
//   try {
//     const removedEvent = await eventModule.findByIdAndRemove(
//       req.params.eventId
//     );
//     res.redirect("/viewevents")
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
app.get('/', landingPageController.landingPage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
