#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import hashlib
import base64

def get(username, domain, masterPassword):
    password = hashlib.sha1()
    password.update(username)
    password.update(domain)
    password.update(masterPassword)
    sha1hash = password.hexdigest()
    encodedHash = base64.b64encode(sha1hash)
    return encodedHash[:20]
