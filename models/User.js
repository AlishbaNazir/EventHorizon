const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });

        this.db = null; // Reference to the MongoDB database
        this.usersCollection = null; // Reference to the users collection

        // Connect to MongoDB
        this.client.connect((err) => {
            if (err) {
                console.error('Error connecting to MongoDB:', err);
            } else {
                console.log('Connected to MongoDB');
                this.db = this.client.db('eventhorizon');
                this.usersCollection = this.db.collection('users');
            }
        });
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
            const user = await this.usersCollection.findOne({ username: username });
            if (!user) {
                return false; // User not found
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
        await this.usersCollection.insertOne(user);
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
            const user = await this.usersCollection.findOne({ email: email });
            return user.otp;
        } catch (error) {
            throw new Error('Error retrieving OTP');
        }
    }

    async addOTP(email, OTP) {
        try {
            await this.usersCollection.updateOne({ email: email }, { $set: { otp: OTP } });
        } catch (error) {
            throw new Error('Error adding OTP');
        }
    }
}

module.exports = User;
