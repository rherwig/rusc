const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const prettier = require('prettier');

const BLOCK = /^\s*\/\*\sblock\s'(.*)'\s\*\/$\s*(?:^(.*)$\s*)?^\s*\/\*\send\s\*\/$/gm;

module.exports = (features, projectPath) => new Promise(resolve => {
    features.forEach(feature => {
        const { snippets } = require(`${projectPath}/_snippets/${feature}/_features`);
        snippets.forEach(snippetPath => {
            const src = readFileSync(join(projectPath, '_snippets', feature, snippetPath)).toString();
            const dest = readFileSync(join(projectPath, snippetPath)).toString();

            let match;
            let blocks = {};

            while ((match = BLOCK.exec(src)) !== null) {
                if (match.index === BLOCK.lastIndex) {
                    BLOCK.lastIndex++;
                }

                const [ _, name, content ] = match;
                blocks[name] = content;
            }

            const result = dest.replace(BLOCK, (match, name) => {
                return blocks[name];
            });

            const prettyResult = prettier.format(result, {
                tabWidth: 4,
                singleQuote: true
            });

            writeFileSync(join(projectPath, snippetPath), prettyResult, 'utf-8');
        });
    });

    return resolve();
});
