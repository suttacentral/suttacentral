const { createMacro } = require('babel-plugin-macros');
const { parseDOM } = require('htmlparser2');
const { createHash } = require('crypto');
const { join } = require('path');
const { open, mkdir } = require('fs').promises;
const fetch = require('node-fetch');


const availableLanguages = fetch('https://raw.githubusercontent.com/suttacentral/sc-data/master/additional-info/available_languages.json')
  .then(resp => resp.json())
  .then(data => data
    .map(lang => lang.iso_code)
    .filter(code => code !== 'en')
  );

function prepareJSON(lang, contents) {
  return JSON.stringify({
    [lang]: contents
  }, null, 4);
}

async function writeFile(path, mode, contents) {
  const file = await open(path, mode);
  await file.writeFile(contents);
  await file.close();
}

async function saveJSON(basename, hashes) {
  const basePath = join(__dirname, 'elements', `static_${basename}`);
  try {
    await mkdir(basePath);
  } catch {
    // dir exists, do nothing
  }

  const path = join(basePath, 'en.json');
  await writeFile(path, 'w', prepareJSON('en', hashes));

  const languages = await availableLanguages;
  for (let lang of languages) {
    try {
      const path = join(basePath, `${lang}.json`);
      await writeFile(path, 'wx', prepareJSON(lang, {}));
    } catch {
      // file exists, skip
    }
  }
}


function i18nMacro({ babel: { types: t }, references, state }) {
  const hashes = {};

  references.default.forEach(referencePath => {
    const [ firstTemplateElement ] = referencePath.parentPath.node.quasi.quasis;
    const string = firstTemplateElement.value.cooked;

    const hash = createHash('md5').update(string).digest('hex');
    hashes[hash] = string;

    const dom = parseDOM(string);
    const containsHTMLElements = dom.filter(node => node.type !== 'text').length !== 0;

    let fnCall = t.callExpression(
      t.memberExpression(
        t.identifier('this'),
        t.identifier('localize')
      ),
      [ t.stringLiteral(hash) ]
    );

    if (containsHTMLElements) {
      fnCall = t.callExpression(
        t.identifier('unsafeHTML'),
        [ fnCall ]
      );
    }

    referencePath.parentPath.replaceWith(fnCall)
  });

  saveJSON(state.file.opts.basename, hashes).catch(console.error);
}

module.exports = createMacro(i18nMacro);
