const User = require('../models/User');

exports.adminDashboard = async (req, res) => {
    res.render('adminDashboard', {error: ''});
}



