import re
import sys
import os

def fix_badges(file_path, version):
    with open(file_path, "rt") as file:
        data = file.read()

    data = re.sub(r'npm-v.*?-blue', 'npm-v{version}-blue'.format(**locals()), data)
    data = re.sub(r'branch=.*?\)', 'branch=v{version})'.format(**locals()), data)
    data = re.sub(r'branch/.*/graph', 'branch/v{version}/graph'.format(**locals()), data)
    data = re.sub(r'tree/.*/', 'tree/v{version}/'.format(**locals()), data)

    with open(file_path, "wt") as file:
        file.write(data)

def fix_version(file_path, version):
    with open(file_path, "rt") as file:
        data = file.read()

    data = re.sub(r'"version":\s*".*"', '"version": "{version}"'.format(**locals()), data, 1)
    
    with open(file_path, "wt") as file:
        file.write(data)

def fix_dependency(file_path, version):
    with open(file_path, "rt") as file:
        data = file.read()

    data = re.sub(r'"@fdefelici/react-bootstrap-combobox":\s*".*"', '"@fdefelici/react-bootstrap-combobox": "{version}"'.format(**locals()), data, 1)
    
    with open(file_path, "wt") as file:
        file.write(data)

def main(version):
    if len(sys.argv) != 2:
        print("[ERROR] Missing argument version such as: X.Y.Z")
        sys.exit()
    version = sys.argv[1]
    ver_pattern = re.compile("^[0-9]\.[0-9]\.[0-9]$")
    if not ver_pattern.match(version):
        print("[ERROR] Wrong argument version. It must be: X.Y.Z")
        sys.exit()

    py_path = os.path.realpath(__file__)
    base_path = os.path.join(os.path.dirname(py_path), "..")
    fix_badges(os.path.join(base_path, "README.md"), version)
    fix_version(os.path.join(base_path, "package.json"), version)
    fix_version(os.path.join(base_path, "package-lock.json"), version)
    fix_dependency(os.path.join(base_path, "example/package.json"), version)

if __name__ == "__main__":
    main(sys.argv)