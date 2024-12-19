const fs = require('fs');
const path = require('path');
const pathToActivities = path.join(__dirname, '..', 'data', 'activities.json');

const getActivities = (req, res) => {
  res.send(require('../data/activities.json'));
};

const addNewActivity = (req, res) => {
  const activity = req.body;

  fs.writeFile(
    pathToActivities,
    JSON.stringify([...require('../data/activities.json'), activity]),
    (err) => {
      if (err) console.log(err);
    }
  );

  res.send(activity);
};

const updateActivity = (req, res) => {
  const { activity, id } = req.body;
  const data = require('../data/activities.json');

  if (id >= data.length) return res.status(400).send("Activity doesn't exist");

  for (let prop in data[id]) {
    if (!(prop in activity)) activity[prop] = data[id][prop];
  }

  data.splice(id, 1, activity);

  fs.writeFile(pathToActivities, JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });

  res.send(activity);
};

const deleteActivity = (req, res) => {
  const data = require('../data/activities.json');
  const id = req.body.id;

  if (id >= data.length || id == null || id == undefined) {
    return res.status(400).send("Activity doesn't exist");
  }

  data.splice(id, 1);

  fs.writeFile(pathToActivities, JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });

  res.sendStatus(200);
};

const clearActivities = (req, res) => {
  fs.writeFile(pathToActivities, JSON.stringify([]), (err) => {
    if (err) console.log(err);
  });

  res.sendStatus(200);
};

module.exports = {
  getActivities,
  addNewActivity,
  updateActivity,
  deleteActivity,
  clearActivities,
};
