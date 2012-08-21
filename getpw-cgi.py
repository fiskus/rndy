#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import subprocess
import cgi

form = cgi.FieldStorage()

print("Content-type: text/html\n\n")

masterPassword = form.getvalue('password')
domain = form.getvalue('domain')
username = form.getvalue('username')
count = form.getvalue('count')

password = subprocess.check_output(['./psw.sh', '-u', username, '-d', domain, '-p', masterPassword, '-c', count, '-o'])

if form.getvalue('ajax'):
    print(password.decode('ascii'))
else:
    print("<!DOCTYPE>")
    print("<html lang=\"en\">")
    print("<meta charset=\"UTF-8\">")
    print("<meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\">")
    print("<link rel=\"stylesheet\" href=\"/style.css\" />")
    print("<body>")
    print("<p class=domain>" + domain + "</p>")
    print("<p class=hash><input value=" + password.decode('ascii') + " autofocus/></p>")
    print("</body>")
    print("</html>")
