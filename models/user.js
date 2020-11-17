const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        role: {
            type: Number,
            default: 0
        }, 
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.signin = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck) {
            return user;
        } else {
            console.log('Passwords did not match!');
        }
    } else {
        console.log('This email is yet to sign up!');
    }
}

module.exports = mongoose.model('User', userSchema);