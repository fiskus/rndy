#!/usr/bin/env python
# coding: utf-8

import sys
import getpass
import os
import getopt
import hashlib
import base64
import configparser
if sys.platform == "darwin":
    import subprocess

PSW_PATH = os.environ["HOME"] + '/.psw/'
CONFIG_PATH = PSW_PATH + 'config.ini'
PAIRS_PATH = PSW_PATH + 'pairs'
if os.path.exists(CONFIG_PATH):
    config = configparser.ConfigParser()
    config.read(CONFIG_PATH)
if os.path.exists(PAIRS_PATH):
    passwords = configparser.ConfigParser()
    passwords.read(PAIRS_PATH)


def pwget(username, domain, masterPassword):
    password = hashlib.sha1()
    password.update(username.encode("utf8"))
    password.update(domain.encode("utf8"))
    password.update(masterPassword.encode("utf8"))
    sha1hash = password.hexdigest()
    encodedHash = base64.b64encode(sha1hash.encode("utf8"))
    return encodedHash[:20]


def generatePairs(masterPassword):
    if config.has_section("sites"):
        output = ""
        for option in config.options("sites"):
            output += option + ": "
            output += generatePass(masterPassword.encode("utf8"),
                                   option.encode("utf8"),
                                   config.get("sites", option).encode("utf8")
                                  ).decode("utf8") + "\n"
        return output


def writePairs(pairs):
    pairsFile = open(PAIRS_PATH, "w+")
    pairsFile.write("[pairs]\n" + pairs)
    pairsFile.close()


def generatePass(masterPassword, domain, username):
    if domain:
        if username == "":
            if config.has_section("sites") and \
               config.has_option("sites", domain):
                username = config.get("sites", domain)
        password = pwget(username.decode("utf8"),
                         domain.decode("utf8"),
                         masterPassword.decode("utf8"))
        return password
    else:
        usage()
        sys.exit()


def outputPassword(password):
	#print(password.decode("utf8"))
	print(password)


def proceedFurther(domain, username, genPairs):
    if genPairs:
        masterPassword = getpass.getpass()
        if masterPassword:
            writePairs(generatePairs(masterPassword))
        else:
            print("Pairs not generated")
            sys.exit()
    else:
        if domain and \
           os.path.exists(PAIRS_PATH) and \
           passwords.has_section("pairs") and \
           passwords.has_option("pairs", domain):
            outputPassword(passwords.get("pairs", domain))
        else:
            masterPassword = getpass.getpass()
            outputPassword(generatePass(masterPassword.encode("utf-8"),
                                        domain.encode("utf-8"),
                                        username.encode("utf-8")
                                       ))


def usage():
    print("define username, domain name and master-password")


def main(argv):
    username = ""
    domain = ""
    genPairs = 0
    try:
        opts, args = getopt.gnu_getopt(argv,
                                       "ru:d:obg",
                                       ["help",
                                        "username",
                                        "domain",
                                        "raw",
                                        "clipboard",
                                        "generate-pairs"]
                                       )
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
        if opt in ("-g", "--generate-pairs"):
            genPairs = 1
    if opts:
        proceedFurther(domain, username, genPairs)
    else:
        usage()
        sys.exit()

if __name__ == "__main__":
    main(sys.argv[1:])
