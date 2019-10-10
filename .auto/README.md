## Release Creation Process:
1. [Github] check if all issues belonging to the milestone `X.Y.Z` are all closed. Milestone must be at 100%
1. [Local] Pull branch vX.Y.Z
1. [Local] Run `python .auto/prep.py X.Y.Z`
1. [Local] Run `git add .`
1. [Local] Run `git commit -m "prepared for release X.Y.Z"`
1. [Local] Run `git push origin vX.Y.Z`
1. [Github] Open pull request from vX.Y.Z to master (merge + delete branch)
1. [Github] Draft New Release vX.Y.Z
1. [Local] Run `python .auto/rdoc.py PREV(X.Y.Z)` to generate release info
1. [Github] Edit Release vX.Y.Z
1. [Github] Close Milestone X.Y.Z