#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import cgi
from subprocess import call

form = cgi.FieldStorage()

print("Content-type: text/html\n\n")
masterPassword = form.getvalue("password")
domain = form.getvalue("domain")
username = form.getvalue("username")
count = form.getvalue("count")

password = call(username, domain, masterPassword)

print("<!DOCTYPE>")
print("<html lang=\"en\">")
print("<meta charset=\"UTF-8\">")
print("<meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\">")
print("<style> \
	P {text-align: center;} .domain {margin-top: 100px; color: #CCC;} \
	.hash INPUT {font-size: 3em; color: #EFEFEF; border: 0; text-align: center;} \
	::-moz-selection { background:#EFEFEF; color:#FFF; } \
	::selection { background:#EFEFEF; color:#FFF; } \
	</style>")
print("<body>")
print("<p class=domain>" + domain + "</p>")
print("<p class=hash><input value=" + password + " autofocus/></p>")
print("</body>")
print("</html>")
