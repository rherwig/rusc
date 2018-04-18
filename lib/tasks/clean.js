const shell = require('shelljs');

module.exports = (projectPath) => new Promise(resolve => {
    shell.rm('-Rf', `${projectPath}/_snippets`);
    shell.rm(`${projectPath}/_variables.js`);

    return resolve();
});
