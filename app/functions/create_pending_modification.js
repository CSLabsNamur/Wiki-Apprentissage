const fs = require('fs-extra');
const get_filepath = require('./get_filepath.js');

async function create_pending_modification (config, file_category, file_name, content) {
  const now = new Date();
  content = `/* Date: ${now} */\n` + content

  // Generate Filepath
  const pending_filepath = get_filepath({
    content  : config.pending_dir,
    filename : `${encodeURI(file_category)}-${file_name}-${now.toISOString()}.md`
  });

  await fs.writeFile(pending_filepath, content);
}

module.exports = create_pending_modification;
