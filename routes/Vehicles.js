const router = require('express').Router();
const vehiclesController = require('../controllers/Vehicles');

router.get('/', vehiclesController.getVehicles);
router.post('/', vehiclesController.getTimeData);

module.exports = router;