const User = require("../models/user");


//GET: Search all user.
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//GET: Search books by id receive.
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ 
            where: { id } 
        });

        if (!!user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//GET: Search books by registration receive.
exports.findByRegistration = async (req, res) => {
    const { registration } = req.params;
    try {
        const user = await User.findOne({ 
            where: { registration } 
        });

        if (!!user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//POST: Insert a user.
exports.create = async (req, res) => {
    const { email } = req.body;
    
    const userEmail = await User.findOne({
        where: { email }
    });

    if (userEmail) {
        res.status(401).json({ error: "Email is invalid or already taken." });
    } else {
        try {
            user = req.body;
            const newUser = await User.create({
                name: user.name,
                registration: user.registration,
                lastName: user.lastName,
                phoneNumber:user.phoneNumber,
                email: user.email,
                acessGroup: user.acessGroup,
                userImage: user.userImage,
            });

            res.json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};

//PUT: Update user data.
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const payload = {};

        if (!!req.body.name) {
            payload.name = req.body.name;
        }
        if (!!req.body.registration) {
            payload.registration = req.body.registration;
        }
        if (!!req.body.lastName) {
            payload.lastName = req.body.lastName;
        }
        if (!!req.body.phoneNumber) {
            payload.phoneNumber = req.body.phoneNumber;
        }
        if (!!req.body.email) {
            payload.email = req.body.email;
        }
        if (!!req.body.acessGroup) {
            payload.acessGroup = req.body.acessGroup;
        }
        if (!!req.body.userImage) {
            payload.userImage = req.body.userImage;
        }

        const updatedUser = await User.update(payload, {
            where: { id },
        });

        res.json({ success: !!updatedUser && +updatedUser[0] > 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//DELETE: Remove user data.
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.destroy({
            where: {
                id,
            },
        });

        res.json({ success: !!deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
