const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        value: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 125
        },
        recovered_at: {
            type: Date,
            default: Date.now
        }
    },
    avatar: {
        type: String,
        default: "NO_AVATAR",
        required: true
    },
    currency: {
        type: String,
        default: "RON",
        minlength: 3,
        maxlength: 3,
        required: true
    },
    social: {
        google: {
            type: String,
            unique: true,
            sparse: true
        },
        facebook: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    register_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    
    validation: {
        status: {
            type: Boolean,
            default: false,
            required: true
        },
        code: {
            type: String,
            minlength: 6,
            maxlength: 6
        },
        sent_at: {
            type: Date,
            default: Date.now
        }
    }
})

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password.value, salt, (err, hash) => {
            if(err){
                return next(err)
            }
            user.password.value = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password.value, (err, isMatch) => {
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            resolve(true)
        })
    })
}


mongoose.model('User', userSchema)