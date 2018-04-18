#!/usr/bin/env node

const rusc = require('caporal');

const createAction = require('./lib/create');

rusc
    .version('0.1.0')
    .command('create', 'Create a new project')
    .option('--features <features>', 'Features to implement')
    .action(createAction);

rusc.parse(process.argv);
