
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "57365736",
            database: "learnify"
        });

        // Connect to the database
        this.con.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            } else {
                console.log('Connected to database');
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
        return await this.query('SELECT * FROM users WHERE email = ?', [email]);
    }

    async checkUserNameDuplicate(username) {
        return await this.query('SELECT * FROM users WHERE username = ?', [username]);
    }

    // Method to execute a query
    async query(sql, params) {
        return new Promise((resolve, reject) => {
            this.con.query(sql, params, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Method to authenticate a user with a hashed password
    async authenticate(username, password) {
        try {
            const query_str = 'SELECT * FROM users WHERE username = ?';
            const [results, fields] = await this.query(query_str, [username]);
            if (results.length === 0) {
                return false; // User not found
            }
            // const hashedPassword = this.hashPassword(password);
            const match = await this.validatePassword(password, results.password);
            console.log(match);
            if (match) {
                return results; // Authentication successful
            } else {
                return false; // Incorrect password
            }
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    }

    // Method to create a new user with a hashed password
    async createUser(username, email, password, role, first_name, last_name, phone_number, date_of_birth, address) {
        const hashedPassword = await this.hashPassword(password);
        const query = 'INSERT INTO users (username, email, password, role, first_name, last_name, date_of_birth, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [username, email, hashedPassword, role, first_name, last_name, date_of_birth, phone_number, address];
        await this.query(query, values);
    }

    // Method to update password for a given email
    async updatePassword(email, password) {
        try {
            const hashedPassword = await this.hashPassword(password);
            const query = 'UPDATE users SET password = ? WHERE email = ?';
            const values = [hashedPassword, email];
            await this.query(query, values);
        } catch (error) {
            throw new Error('Error updating password');
        }
    }

    // Method to retrieve OTP for a given email
    async getOTP(email) {
        try {
            const results = await this.query('SELECT otp FROM users WHERE email = ?', [email]);
            return results;
        } catch (error) {
            throw new Error('Error retrieving OTP');
        }
    }

    // Method to add OTP for a given email
    async addOTP(email, OTP) {
        try {
            const query = 'UPDATE users SET otp = ? WHERE email = ?';
            const values = [OTP, email];
            return await this.query(query, values);
        } catch (error) {
            throw new Error('Error adding OTP');
        }
    }
}

module.exports = User;