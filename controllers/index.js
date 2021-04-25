const router = require('express').Router();
const apiroutes = require('./apiRoutes');
const homeroutes = require('./homeRoutes');

router.use('/api', apiroutes);
router.use('/', homeroutes);

module.exports = router;