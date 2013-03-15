#!/usr/bin/env node

var config = {
        'browser-cmd': 'chromium-browser'
    };

var fs = require('fs'),
    spawn = require('child_process').spawn;

var urlFilePath = process.argv[2],
    fileContent,
    url;

if (!fs.existsSync(urlFilePath)) {
    fatalError('The given Internet Shortcut file "' + urlFilePath + '" does not exist!');
}

try {
    fileContent = fs.readFileSync(urlFilePath).toString();
} catch (error) {
    fatalError(error);
}

var matches = /^URL=(.+)/m.exec(fileContent);
if (!matches) {
    fatalError('The .url file "' + urlFilePath + '" may be malformed')
}

url = matches[1];
spawn(config['browser-cmd'], [url]);

function fatalError(message) {
    console.error(message);
    process.exit(1);
}
