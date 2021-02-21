
'use strict';

// Modules
const create_meta_info = require('../functions/create_meta_info');
const create_pending_modification = require('../functions/create_pending_modification');
const override_content = require('../functions/override_content');

function route_page_edit (config) {
  return async function (req, res, next) {

    let file_category;
    let file_name;

    // Handle category in file path
    const req_file = req.body.file.split('/');
    if (req_file.length > 2) {
      file_category = req_file[1];
      file_name     = req_file[2];
    } else {
      file_name     = req_file[1];
    }

    // Create content including meta information (i.e. title, description, sort)
    function create_content (body) {
      var meta = create_meta_info(body.meta_title, body.meta_description, body.meta_sort);
      return meta + body.content;
    }

    const complete_content = create_content(req.body);

    // Save the file in the pending folder
    try {

      if (req.session.loggedIn) {
        await override_content(config, file_category, file_name, complete_content);
      } else {
        await create_pending_modification(config, file_category, file_name, complete_content);
      }

      res.json({
        status  : 0,
        message : config.lang.api.pageSaved
      });
    } catch (error) {
      console.error(error);
      res.json({
        status  : 1,
        message : error
      });
    }
  };
}

// Exports
module.exports = route_page_edit;
