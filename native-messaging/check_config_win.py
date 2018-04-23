'''
A Python script that attempts to check that the configuration of your
nativeMessaging app is set up correctly

Currently requires Python 3.

If you find more issues with setting this up, let's see if we can add to this
script.
'''
import json
import os
import re
import winreg

key_path = 'Software\\Mozilla\\NativeMessagingHosts\\ping_pong'
# Assuming current user overrides local machine.
key_roots = ['HKEY_CURRENT_USER', 'HKEY_LOCAL_MACHINE']

found_key = False

for root in key_roots:
    key = winreg.OpenKey(getattr(winreg, root), key_path)
    try:
        print('Checking:', root, key_path)
        res = winreg.QueryValueEx(key, '')
    except FileNotFoundError:
        print('...error finding key')
        continue

    found_key = True
    break

if not found_key:
    raise ValueError('Could not find a registry entry, aborting.')

json_path = res[0]
print('Path from registry key is:', json_path)
if not os.path.exists(json_path):
    raise ValueError('JSON file does not exist:', json_path)

try:
    bat_data = json.load(open(json_path, 'r'))
except json.decoder.JSONDecodeError:
    raise ValueError('Parsing error. Is {} a JSON file?'.format(json_path))

bat_path = bat_data['path']
print('Path from JSON is:', bat_path)
if not os.path.exists(bat_path):
    raise ValueError('.bat does not exist:', bat_path)

py_lines = open(bat_path, 'r').readlines()
py_path = None
for line in py_lines:
    if line.startswith('call python '):
        py_path = line[12:].replace('\\\\', '\\').strip()

if not py_path:
    raise ValueError('No python script in the batch file.')

print('Path from batch file is:', py_path)
if not os.path.exists(py_path):
    raise ValueError('Python file does not exist:', py_path)

print('Looks good! Give it a try from Firefox.')
