const User = require('../models/User');

exports.userProfile = async (req, res) => {
    res.render('userProfile', {error: ''});
}

exports.saveProfile = async (req, res) => {
    // Retrieve form data from request body
    const newProfile = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        bio: req.body.bio,
        birthday: req.body.birthday,
        country: req.body.country,
        phone: req.body.phone,
        website: req.body.website
    };
  
    // try {
    //   await profile.save();
    //   res.redirect("/userProfile");
    // } catch (err) {
    //   res.json({ message: err });
    // }
    // Connection URL
    const url = 'mongodb+srv://usmanamjad:TkiS8cU91tpX4YnS@eventmanagementsystem.9cqe4zu.mongodb.net/?retryWrites=true&w=majority&appName=EventManagementSystem';

    // Database Name
    const dbName = 'event';

    console.log('Connecting to MongoDB...');
    // Create a new MongoClient
    this.client = new MongoClient(url);

    try {
        await this.client.connect();
        console.log("Connected successfully to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }

    // await this.connect();
    const db = this.client.db('event');

    try {

        // Create new event
        await db.collection('userprofile').insertOne(newProfile);
        // Redirect to event page upon successful event creation
        res.redirect('/');
    } catch (error) {
        // Handle error
        console.error('Error processing event:', error);
        return res.status(500).send('Internal Server Error');
    }

}
