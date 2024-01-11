/*
 * Import module dependencies
 */

const express = require("express");
const router = express.Router();

/*
 * Render home page.
 */

router.get('/', async (req, res, next)=> {
  // NOTE: demo using EJS template engine to render a page
  res.render('about.ejs', {
    serverName: "Test user",
    serverPurpose: "Interactive 3D Web design !"
  });
});

module.exports = router;
