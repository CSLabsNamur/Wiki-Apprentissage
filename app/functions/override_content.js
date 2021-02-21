const fs = require('fs-extra');
const get_filepath = require('./get_filepath.js');

async function override_content (config, file_category, file_name, content) {

  // Generate Filepath
  let filepath = get_filepath({
    content  : config.content_dir,
    category : file_category,
    filename : file_name
  });

  if (!(await fs.pathExists(filepath))) {
    filepath += '.md';
  }

  console.log(filepath);

  await fs.writeFile(filepath, content);
}

module.exports = override_content;
