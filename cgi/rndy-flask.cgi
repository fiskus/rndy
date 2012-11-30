#!/usr/bin/python

import cgitb
cgitb.enable()


from wsgiref.handlers import CGIHandler
from hello import app

CGIHandler().run(app)
