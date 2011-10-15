#!/usr/bin/env python2.7
# coding: utf-8

import sys
import getpass
import getopt
import pygtk
import gtk
import base64
import hashlib

def usage():
    print "define username, domain name and master-password"

def main(argv):
    username = ""
    domain = ""
    try:
        opts, args = getopt.gnu_getopt(argv, "hu:d:", ["help", "username", "domain"])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage()
            sys.exit()
        if opt in ("-u", "--username"):
            username = arg
        if opt in ("-d", "--domain"):
            domain = arg
    masterPassword = getpass.getpass()

    if masterPassword and username and domain:
        password = hashlib.sha1()
        password.update(username)
        password.update(domain)
        password.update(masterPassword)
        sha1hash = password.hexdigest()
        encodedHash = base64.b64encode(sha1hash)
        output = encodedHash[:20]

        clipboard = gtk.clipboard_get()
        clipboard.set_text(output)
        clipboard.store() # don't get why this is not working

        raw_input("Press any key to continue…") # clipboard able to use when program is working
    else:
        usage()
        sys.exit()

if __name__ == "__main__":
    main(sys.argv[1:])
