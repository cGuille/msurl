#!/usr/bin/env node

var config = {
        'browser-cmd': 'chromium-browser'
    };

var fs = require('fs'),
    spawn = require('child_process').spawn,
    format = require('util').format;

var urlFileFormat = '[{000214A0-0000-0000-C000-000000000046}]\r\nProp3=19,2\r\n[InternetShortcut]\r\nURL=%s\r\nIDList=',
    urlFilePath = process.argv[2],
    argc = process.argv.length,
    fileContent, url;

if (argc === 4) {
    create(process.argv[2], process.argv[3]);
} else if (argc === 3) {
    open(process.argv[2]);
} else {
    fatalError('Usage:\r\n  - Open an URL shortcut:\r\n       msurl <internet-shortcut.url>\r\n  - Create an URL shortcut:\r\n       msurl <url> <output path>');
}

function create(url, urlFilePath) {
    if (!/\w:\/\/.+/.test(url)) {
        fatalError('The format of the provided URL seems to be incorrect.')
    }
    if (fs.existsSync(urlFilePath)) {
        fatalError('The given path for the Internet Shortcut file "' + urlFilePath + '" already exist.');
    }
    fs.writeFile(urlFilePath, format(urlFileFormat, url), function (error) {
        if (error) {
            fatalError(error);
        }
    });
}

function open(urlFilePath) {
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
}

function fatalError(message) {
    console.error(message);
    process.exit(1);
}
