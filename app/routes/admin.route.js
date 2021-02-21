'use strict';

const fetch_pending_pages = require('../functions/fetch_pending_pages');

function admin_route (config) {
  return async function (req, res, next) {

    const loggedIn = ((config.authentication || config.authentication_for_edit) ? req.session.loggedIn : false);

    const pending_pages = await fetch_pending_pages(config);

    console.log(pending_pages);

    return res.render('admin', {
      config        : config,
      current_url   : req.protocol + '://' + req.get('host') + req.originalUrl,
      body_class    : 'page',
      lang          : config.lang,
      loggedIn      : loggedIn,
      username      : (config.authentication ? req.session.username : null),
      files         : pending_pages
    });
  }
}

module.exports = admin_route;
