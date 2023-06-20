const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const tourController = require('./../controllers/tourController');

const router = express.Router();
// router.param('id', tourController.checkId);
router
  .route('/top-5-tours')
  .get(tourController.aliasTopFive, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plans/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
