let router = require('express').Router();
//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});
var playerController = require('./playerController');
// Player routes
router.route('/players')
    .get(playerController.index)
    .post(playerController.add);
router.route('/players/:players_id')
    .get(playerController.view)
    .patch(playerController.update)
    .put(playerController.update)
    .delete(playerController.delete);

 router.get('/players/:id/stats', playerController.getPlayerStatsById);
 router.get('/highest-goal-scorer', playerController.getHighestGoalScorer);
 router.get('/highest-assist-maker', playerController.getHighestAssistMaker);
 router.get('/highest-tackles',playerController.getHighestTackles);
 router.get('/players-from-england', playerController.getPlayersFromEngland);
 router.get('/players-sorted-by-matches', playerController.getPlayersSortedByMatches);


  



    
module.exports = router;