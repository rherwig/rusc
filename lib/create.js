const prompt = require('prompt');
const shell = require('shelljs');
const colors = require('colors/safe');
const { existsSync } = require('fs');
const { join } = require('path');

const replaceVariables = require('./tasks/replace-variables');
const createFeatures = require('./tasks/replace-files');
const replaceSnippets = require('./tasks/replace-snippets');
const clean = require('./tasks/clean');

prompt.message = colors.green('Replace');

module.exports = async (args, options, logger) => {
    const templatePath = join(__dirname, '../templates/react');
    const localPath = process.cwd();
    // const features = options.features;
    const features = ['streaming'];

    if (!existsSync(templatePath)) {
        logger.error('The requested template was not found.');
        process.exit(1);
    }
    
    logger.info('Copying files...');
    shell.cp('-R', `${templatePath}/*`, localPath);

    logger.info('Configuring features...');
    const variables = require(`${templatePath}/_variables`);
    await replaceVariables(variables);
    await createFeatures(features, localPath);
    await replaceSnippets(features, localPath);

    logger.info('Cleaning up...');
    clean(localPath);

    logger.info('Your project is ready.');
    process.exit(0);
};
