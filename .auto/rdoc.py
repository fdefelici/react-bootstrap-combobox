import os
import re
import sys

def main(version):
    if len(sys.argv) != 2:
        print("[ERROR] Missing argument version (PREVIOUS) such as: X.Y.Z")
        sys.exit()
    version = sys.argv[1]
    ver_pattern = re.compile("^[0-9]+\.[0-9]+\.[0-9]+$")
    if not ver_pattern.match(version):
        print("[ERROR] Wrong argument version (PREVIOUS). It must be: X.Y.Z")
        sys.exit()

    cmd = 'github_changelog_generator --user fdefelici --project react-bootstrap-combobox -t b424da9bcfb6e2a27b531eeba999965301821512 --since-tag v{version} --no-unreleased'.format(**locals())
    os.system(cmd)

if __name__ == "__main__":
    main(sys.argv)