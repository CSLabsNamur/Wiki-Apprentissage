
const contentProcessors = require('../functions/contentProcessors');

function route_wildcard (config) {
  return async function (req, res, next) {

    const content = `

    Ceci est un exemple de contenu de page.
    Celle-ci sera un tutoriel, des références, ou tout autre ressource  écrite qui pourrait contribuer
    au wiki.

    Ici, vous pouvez dès lors rédiger votre page avant que celle-ci soit soumise à validation.
    Cet éditeur supporte la syntaxe "Markdown" de base.

    Si vous le souhaitez, vous pouvez signer dans un commentaire en bas de page.

    // Auteur : Training Manager
    `;

    const loggedIn = ((config.authentication || config.authentication_for_edit) ? req.session.loggedIn : false);
    const template = 'page';

    const meta = contentProcessors.processMeta(content);
    if (!meta.title) {
      meta.title = 'Nouvelle page';
    }
    meta.custom_title = meta.title;

    return res.render('new', {
      config        : config,
      pages         : [],
      meta          : meta,
      content       : content,
      current_url   : req.protocol + '://' + req.get('host') + req.originalUrl,
      body_class    : template,
      lang          : config.lang,
      loggedIn      : loggedIn,
      username      : (config.authentication ? req.session.username : null)
    });

  }
}

// Exports
module.exports = route_wildcard;
