const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        // Connection URL
        const url = 'mongodb+srv://usmanamjad:TkiS8cU91tpX4YnS@eventmanagementsystem.9cqe4zu.mongodb.net/?retryWrites=true&w=majority&appName=EventManagementSystem';

        // Database Name
        const dbName = 'event';

        console.log('Connecting to MongoDB...');
        // Create a new MongoClient
        this.client = new MongoClient(url);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected successfully to MongoDB");
        } catch (err) {
            console.error("Failed to connect to MongoDB", err);
        }
    }

    // Method to hash a password
    async hashPassword(password) {
        try {
            const saltRounds = 10; // Salt rounds for bcrypt
            return await bcrypt.hash(password, saltRounds);
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }

    // Method to validate a password
    async validatePassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new Error('Error validating password');
        }
    }

    async checkEmailDuplicate(email) {
        return await this.usersCollection.findOne({ email: email });
    }

    async checkUserNameDuplicate(username) {
        return await this.usersCollection.findOne({ username: username });
    }

    async authenticate(username, password) {
        try {
            await this.connect();
            const db = this.client.db('event'); 
            const usersCollection = db.collection('user'); 
            let user = await usersCollection.findOne({ username: username });
        
            // If user not found in 'user' collection, check 'admin' collection
            if (!user) {
                const adminCollection = db.collection('admin');
                user = await adminCollection.findOne({ username: username });
        
                // If user is found in 'admin' collection, add 'role' property to user object
                if (user) {
                    user.role = 'admin';
                } else {
                    return false; // User not found in both collections
                }
            }
            else {
                user.role = 'user';
            }
        
            const match = await this.validatePassword(password, user.password);
            if (match) {
                return user; // Authentication successful
            } else {
                return false; // Incorrect password
            }
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    }

    async createUser(username, email, password, role, first_name, last_name, phone_number, date_of_birth, address) {
        const hashedPassword = await this.hashPassword(password);
        const user = {
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            first_name: first_name,
            last_name: last_name,
            date_of_birth: date_of_birth,
            phone_number: phone_number,
            address: address
        };
        try {
            await this.connect();
            const db = this.client.db('event');

            if (role == "admin"){
                await db.collection('admin').insertOne(user);
                console.log('Admin created successfully');
            }
            else{
                await db.collection('user').insertOne(user);
                console.log('User created successfully');
            }

        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    async updatePassword(email, password) {
        try {
            const hashedPassword = await this.hashPassword(password);
            await this.usersCollection.updateOne({ email: email }, { $set: { password: hashedPassword } });
        } catch (error) {
            throw new Error('Error updating password');
        }
    }

    async getOTP(email) {
        try {
            await this.connect();
            const db = this.client.db('event');
            const usersCollection = db.collection('user');
            const user = await usersCollection.findOne({ email: email });
            return user.otp;
        } catch (error) {
            throw new Error('Error retrieving OTP');
        }
    }
    
    async addOTP(email, OTP) {
        try {
            await this.connect();
            const db = this.client.db('event');
            const usersCollection = db.collection('user');
            await usersCollection.updateOne({ email: email }, { $set: { otp: OTP } });
        } catch (error) {
            throw new Error('Error adding OTP');
        }
    }
}

module.exports = User;