var express = require('express'); 
var GetObjects = require('../utils/GetObjects')
var router = express.Router();
var json = require('../service/confrontation/get.json')
/* GET home page. */
router.get('/', async function(req, res, next) {
    const values = []
    const team = [
        {
            teamHome: {
                name: null,
                initials: null,
                id: null
            },
            teamVisiting: {
                name: null
            }
        }
    ]
     GetObjects.get(team, JSON.parse(JSON.stringify(json)), values)
     console.log(values)
  res.json(values);
});

module.exports = router;