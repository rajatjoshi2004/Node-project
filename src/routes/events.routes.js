const express = require('express');
const { eventsValidation } = require('../validations/index');
const { eventsController } = require('../controllers/index');
const validate = require('../middelwares/validate');
const router = express.Router();

router
  .route('/')
  .post(validate(eventsValidation.create), eventsController.create)
  .get( eventsController.paginate);

router
  .route('/:id')
  .get(validate(eventsValidation.get), eventsController.get)
  .patch(validate(eventsValidation.update), eventsController.update)
  .delete(validate(eventsValidation.destroy), eventsController.destroy);
  
module.exports = router;



