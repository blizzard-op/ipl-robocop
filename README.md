ipl-robocop
===========

Dead or alive you're coming with me.

IPL-Robocop is the editor portion of a three program set which makes up IPL's bracket platform for 2013 and possibly beyond.

Requirements
- Brunch 1.5 or greater
- Node 0.8 or greater
- Mongodb

Building
cd to the ipl-robocop directory and start a local instance by running the command:
brunch w -s
note: if you've just cloned the project you will need to run npm install from the project directory
this will allow you to access the editor using the following url http://localhost:3333/brackets/v6/admin

Testing
visit http://localhost:3333/test to run the test suite.
You can also run the tests from the command line using: brunch test

Deploying
upload the compiled public/ directory to a static asset server.

Usage
1. Use the Wizard menu to generate a bracket
2. Use the Teams menu to enter the participating teams.
3. Click on a match to edit its details / start and stop a game