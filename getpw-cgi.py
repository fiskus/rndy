#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import cgi
import hashlib
import base64

form = cgi.FieldStorage()

def pwget(username, domain, masterPassword):
    password = hashlib.sha1()
    password.update(username)
    password.update(domain)
    password.update(masterPassword)
    sha1hash = password.hexdigest()
    encodedHash = base64.b64encode(sha1hash)
    return encodedHash[:20]

print("Content-type: text/html\n\n")
masterPassword = form.getvalue("password")
domain = form.getvalue("domain")
username = form.getvalue("username")

password = pwget(username, domain, masterPassword)

print("<!DOCTYPE>")
print("<html lang=\"en\">")
print("<meta charset=\"UTF-8\">")
print("<meta http-equiv=\"refresh\" content=\"15; url=/\">")
print("<meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\">")
print("<style> \)
	P {text-align: center;} .domain {margin-top: 100px; color: #CCC;} \)
	.hash INPUT {font-size: 3em; color: #EFEFEF; border: 0; text-align: center;} \)
	::-moz-selection { background:#EFEFEF; color:#FFF; } \)
	::selection { background:#EFEFEF; color:#FFF; } \)
	</style>")
print("<body>")
print("<p class=domain>" + domain + "</p>")
print("<p class=hash><input value=" + password + " autofocus/></p>")
print("</body>")
print("</html>")
