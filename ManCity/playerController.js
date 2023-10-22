const Player = require('./Players');

exports.index = async function(req, res) {
    try {
        const players = await Player.find();
        res.json({
            status: "success",
            message: "Got players Successfully!",
            data: players
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.add = async function(req, res) {
    try {
        const { name, country, matches, position, goals, assists, tackles } = req.body;
        const player = new Player({
            name,
            country,
            matches,
            position,
            goals,
            assists,
            tackles
        });

        const savedPlayer = await player.save();
        res.json({
            message: "New Player Added!",
            data: savedPlayer
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.view = async function(req, res) {
    try {
        const playerId = req.params.players_id;
        
        const player = await Player.findById(playerId);
        
        if (!player) {
            return res.status(404).json({
                status: "error",
                message: "Player not found"
            });
        }
        res.json({
            message: 'Player Details',
            data: player
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const playerId = req.params.players_id;
        const { name, country, position, matches, goals, assists, tackles } = req.body;

        const player = await Player.findByIdAndUpdate(
            playerId,
            { name, country, position, matches, goals, assists, tackles },
            { new: true }
        );

        if (!player) {
            return res.status(404).json({
                status: "error",
                message: "Player not found"
            });
        }

        res.json({
            message: "Player Updated Successfully",
            data: player
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.delete = async function(req, res) {
    try {
        const playerId = req.params.players_id;
        const player = await Player.findByIdAndDelete(playerId);

        if (!player) {
            return res.status(404).json({
                status: "error",
                message: "Player not found"
            });
        }

        res.json({
            status: "success",
            message: 'Player Deleted'
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


// Get player stats by ID controller
exports.getPlayerStatsById = async function (req, res) {
  try {
    const playerId = req.params.id;

    
    const playerStats = await Player.findById(playerId).select('_id name matches goals assists tackles');

    if (!playerStats) {
      return res.status(404).json({
        status: "error",
        message: "Player stats not found"
      });
    }

    res.json({
      status: "success",
      message: "Player stats retrieved successfully",
      data: playerStats
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

exports.getHighestGoalScorer = (req, res) => {
    Player.findOne().sort('-goals').exec()
      .then(player => {
        res.json(player);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  };
  
  exports.getHighestAssistMaker = async (req, res) => {
    try {
      const player = await Player.findOne().sort('-assists').exec();
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getHighestTackles = async (req, res) => {
    try {
      const player = await Player.findOne().sort('-tackles').exec();
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getPlayersFromEngland = async (req, res) => {
    try {
      const players = await Player.find({ country: 'England' }).exec();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.getPlayersSortedByMatches = async (req, res) => {
    try {
      const players = await Player.find().sort({ matches: -1 }).exec();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };