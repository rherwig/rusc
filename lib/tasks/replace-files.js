const shell = require('shelljs');
const { join } = require('path');

module.exports = (features, projectPath) => new Promise(resolve => {
    features.forEach(feature => {
        const { files } = require(`${projectPath}/_snippets/${feature}/_features`);
        files.forEach(fileName => {
            shell.cp(
                join(projectPath, '_snippets', feature, fileName),
                join(projectPath, fileName)
            );
        });
    });

    return resolve();
});
