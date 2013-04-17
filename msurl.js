#!/usr/bin/env node

/*
Copyright 2012-2013 Guillaume CHARMETANT

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var fs = require('fs'),
    spawn = require('child_process').spawn,
    format = require('util').format;

var urlFileFormat = '[{000214A0-0000-0000-C000-000000000046}]\r\nProp3=19,2\r\n[InternetShortcut]\r\nURL=%s\r\nIDList=',
    argc = process.argv.length;

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

    var fileContent;

    try {
        fileContent = fs.readFileSync(urlFilePath).toString();
    } catch (error) {
        fatalError(error);
    }

    var matches = /^URL=(.+)/m.exec(fileContent);
    if (!matches) {
        fatalError('The .url file "' + urlFilePath + '" may be malformed')
    }

    spawn('xdg-open', [matches[1]]);
}

function fatalError(message) {
    console.error(message);
    process.exit(1);
}
