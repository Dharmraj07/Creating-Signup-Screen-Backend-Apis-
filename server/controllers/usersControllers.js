const User = require("../models/users");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });
};

const signup = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
        });

        const token = generateAccessToken(newUser);

        return res.status(201).json({newUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


module.exports={signup}