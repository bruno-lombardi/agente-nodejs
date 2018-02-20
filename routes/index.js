const router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ app: 'agente.esp' });
});

module.exports = router;
