import os
import re
import sys

def main(version):
    if len(sys.argv) != 4:
        print("[ERROR] Missing one of arguments: version (PREVIOUS) such as: X.Y.Z or userid or token")
        sys.exit()
    version = sys.argv[1]
    userid = sys.argv[2]
    token = sys.argv[3]
    ver_pattern = re.compile("^[0-9]+\.[0-9]+\.[0-9]+$")
    if not ver_pattern.match(version):
        print("[ERROR] Wrong argument version (PREVIOUS). It must be: X.Y.Z")
        sys.exit()
    cmd = 'github_changelog_generator --user {userid} --project react-bootstrap-combobox -t {token} --since-tag v{version} --no-unreleased'.format(**locals())
    os.system(cmd)

if __name__ == "__main__":
    main(sys.argv)
