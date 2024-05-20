const SystemAdmin = require('../models/systemAdmin');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registering a new system admin
const registerSystemAdmin = async (req, res) => {
    try {
        const { Fullname, SystemAdminID, Email, Address, Phone, UserType, Password } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        const systemAdmin = new SystemAdmin({
            Fullname,
            SystemAdminID,
            Email,
            Address,
            Phone,
            UserType,
            Password: hashedPassword,
        });

        await systemAdmin.save();

        res.json({ message: 'System admin registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'System admin registration failed' });
    }
};

// System Admin Login
const loginSystemAdmin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const systemAdmin = await SystemAdmin.findOne({ Email });
        if (!systemAdmin) {
            res.status(401).json({ error: 'System admin authentication failed' });
            return;
        }

        const passwordMatch = await bcrypt.compare(Password, systemAdmin.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: systemAdmin.Email }, 'secret_key');
            res.json({ token, systemAdmin });
        } else {
            res.status(401).json({ error: 'System admin authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'System admin authentication failed' });
    }
};

// User Registration
const registerUser = async (req, res) => {
    try {
        const { FullName, Gender, Email, Address, Phone, UserType, Password } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = new User({
            FullName,
            Gender,
            Email,
            Address,
            Phone,
            UserType,
            Password: hashedPassword
        });

        await user.save();

        res.json({ message: 'User registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });

        if (!user) {
            res.status(401).json({ error: 'User authentication failed' });
            return;
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: user.Email }, 'secret_key');
            res.json({ token, user });
        } else {
            res.status(401).json({ error: 'User authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User authentication failed' });
    }
};

module.exports = {
    registerSystemAdmin,
    loginSystemAdmin,
    registerUser,
    loginUser
};
