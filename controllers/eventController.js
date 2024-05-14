const User = require('../models/User');
const MongoClient = require('mongodb').MongoClient;

// Controller method to render the event page

exports.eventPage = (req, res) => {
    res.render('newEvent', {error: ''}); 
}

// Controller method to process event form submission

exports.event = async (req, res) => {
    // Retrieve form data from request body
    const newEvent = {
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
    };
  
    // try {
    //   await newEvent.save();
    //   res.redirect("/viewevents");
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
        await db.collection('events').insertOne(newEvent);
        // Redirect to event page upon successful event creation
        res.redirect('/');
    } catch (error) {
        // Handle error
        console.error('Error processing event:', error);
        return res.status(500).send('Internal Server Error');
    }
}