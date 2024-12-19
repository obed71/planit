const express = require('express');
const router = express.Router();

const {
  getActivities,
  addNewActivity,
  updateActivity,
  deleteActivity,
  clearActivities,
} = require('../controllers/activities');

router
  .route('/')
  .get(getActivities)
  .post(addNewActivity)
  .put(updateActivity)
  .delete(deleteActivity);

router.delete('/all', clearActivities);

module.exports = router;
