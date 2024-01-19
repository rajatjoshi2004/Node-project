const express = require('express');

const eventsRoute = require('./events.routes');


const router = express.Router();

const routes = [
  {
    path: '/events',
    route: eventsRoute,
  },

];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
