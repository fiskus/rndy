#!/usr/bin/python

import cgitb
cgitb.enable()


from wsgiref.handlers import CGIHandler
from rndy import app

CGIHandler().run(app)
