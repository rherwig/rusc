const prompt = require('prompt');
const shell = require('shelljs');

module.exports = (variables) => new Promise(resolve => {
    prompt.start().get(variables, (err, result) => {
        shell.ls('-Rl', '.').forEach(entry => {
            if (!entry.isFile()) {
                return;
            }

            variables.forEach(variable => {
                shell.sed('-i', `\\[${variable.toUpperCase()}\\]`, result[variable], entry.name);
            });
        });

        return resolve();
    });
});
