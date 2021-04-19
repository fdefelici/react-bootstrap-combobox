## Release Requirements:
Before start the process you need to check the version of your softwares as described below:
- Python 3.7
- Python lib px-proxy (pip install px-proxy)
- Ruby DevKit 2.6.6
- github_changelog_generator 1.15.2 (installation istructions below under proxy)

## Installation Github Changelog Generator under Proxy:
After the installation of Ruby DevKit the system has Gem to install the github changelog generator. But before install it ensure that Python Px Proxy is up and running. To di this run this on a dedicated command prompt window:

`C:\Python37\python.exe -m px`

in the output of command there is the ip:port of local proxy that uses system proxy configuration automatically (ex. localhost:5260).
In order to install correct version of Github Changelog Generator now run this command in a new command prompt window:

`gem install github_changelog_generator:1.15.2 --http-proxy http://localhost:5260`

if there is no proxy configured, can run the same command without `--http-proxy` statement.

## Release Creation Process:
1. [Github] check if all issues belonging to the milestone `X.Y.Z` are all closed. Milestone must be at 100%
1. [Local] Pull branch vX.Y.Z
1. [Local] Run `python .auto/prep.py X.Y.Z`
1. [Local] Run `git add .`
1. [Local] Run `git commit -m "prepared for release X.Y.Z"`
1. [Local] Run `git push origin vX.Y.Z`
1. [Github] Open pull request from vX.Y.Z to master (merge + delete branch)
1. [Github] Draft New Release (define tag as vX.Y.Z and title as date formatted in this way: YYYY-MM-DD)
1. [Github] Publish Release vX.Y.Z
1. [Local] Run `python .auto/rdoc.py PREV(X.Y.Z) USERID TOKEN` to generate release info
1. [Github] Edit Release vX.Y.Z
1. [Github] Close Milestone X.Y.Z
