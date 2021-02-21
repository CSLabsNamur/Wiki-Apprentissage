
'use strict';

// Modules
const override_content = require('../functions/override_content');

function route_page_create (config) {
  return async function (req, res, next) {

    const category = req.body.category;
    const filename = req.body.name;
    const content = '<!-- Empty page! -->';

    try {
      await override_content(config, category, filename, content);

      res.json({
        status  : 0,
        message : config.lang.api.pageCreated
      });
    } catch (error) {
      res.json({
        status  : 1,
        message : error
      });
    }

  };
}

// Exports
module.exports = route_page_create;
