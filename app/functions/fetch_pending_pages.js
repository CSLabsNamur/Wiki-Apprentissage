
const fs = require('fs-extra');

async function fetch_pending_pages (config) {

  const filenames = await fs.readdir(config.pending_dir);

  const files = filenames.map(async (file) => {
    const path = config.pending_dir + file;
    return {
      name: file,
      content: await fs.readFile(path, 'utf-8')
    }
  });

  return await Promise.all(files);

}

module.exports = fetch_pending_pages;
