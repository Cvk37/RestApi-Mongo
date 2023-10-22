var mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    matches: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    assists: {
        type: Number,
        required: true
    },
    tackles: {
        type: Number,
        required: true
    }
}, {
    versionKey: false // Exclude the "__v" field from the response
});

module.exports = mongoose.model('players', playerSchema);



const Player = mongoose.model('players', playerSchema);

Player.get = async function() {
    try {
        const players = await Player.find();
        return players;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = Player;