msurl
=====

A little nodejs script that handles the Micro$oft .url file format.

This script is inspired from the Perl version that you can find in [this blog post](http://ubuntugenius.wordpress.com/2009/12/09/how-to-open-url-internet-explorer-shortcuts-in-ubuntu-using-firefox/) (thanks to the author).
The original script did not work with one of my .url file so I rewrote it using NodeJS (cause I don't know Perl).

Usage
=====

Pre-requisite: [NodeJS](http://nodejs.org/).

Open a terminal and go to a temporary directory ( *e.g.* `mkdir ~/tmp ; cd ~/tmp`). Then, do the following steps:

    git clone https://github.com/cGuille/msurl.git
    cd msurl

If necessary ( *i.e.* if you don't use the same browser as me), open the file msurl.js with your favorite text editor and edit this line to specify which command to use to launch your favorite web browser:

`'browser-cmd': 'chromium-browser'`

Replace `'chromium-browser'` with any browser command you want to use (`'firefox'`, `'chrome'`…).

Then save the file and go back to your terminal:

    chmod a+x msurl.js
    sudo cp msurl.js /usr/bin/msurl

To complete the process, you will have to configure the file associations in your GUI environnement to make it use msurl to handle the .url files.
Under KDE, this can be performed by doing the following steps:
  - right click on a .url file;
  - choose "Open With > Other";
  - Type "msurl" in the field labeled "Open with:";
  - Check "Remember application association for this type of file";
  - Click "Ok" to confirm.

Enjoy!
