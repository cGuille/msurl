msurl
=====

A little nodejs script that handle the Micro$oft .url file format.

This script is inspired from the Perl version that you can find in [this blog post](http://ubuntugenius.wordpress.com/2009/12/09/how-to-open-url-internet-explorer-shortcuts-in-ubuntu-using-firefox/) (thanks to the author).
The original script did not work with one of my .url file so I rewrote it using a NodeJS.

Usage
=====

Open a terminal and go to a temporary directory (`mkdir ~/tmp ; cd ~/tmp`). Then, do the following steps:

    git clone https://github.com/cGuille/msurl.git
    cd msurl

If necessary, open the file msurl.js with your favorite text editor and edit this line to specify which command to use to launch your favorite web browser:
    'browser-cmd': '[your-browser-command]'
Sample values: 'chromium-browser' (default), 'firefox', 'chrome'…

Then save the file and go back to your terminal:

    chmod a+x msurl.js
    sudo cp msurl.js /usr/bin/msurl

To complete the process, you will have to configure the file associations in your GUI environnement to make it use msurl to handle the .url files.
Under KDE, this can be done by doing the following steps:
  - right click on a .url file;
  - choose "Open With > Other";
  - Type "msurl" in the field labeled "Open with:";
  - Check "Remember application association for this type of file";
  - Click "Ok" to confirm.

Enjoy!
