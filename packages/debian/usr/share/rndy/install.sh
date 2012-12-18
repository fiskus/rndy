#!/bin/bash

CONFIG_DIR="$HOME/.rndy"
CONFIG="$HOME/.rndy/rndyrc"

function setMasterPassword {
    echo -n "Set master password: "
    read -s MASTERPASSWORD
    echo ""
    tmppass=$(mktemp)
    echo -n $MASTERPASSWORD > $tmppass
}

function setEmail {
    echo -n "Set email: "
    read EMAIL
    echo ""
    sed  -i "s/\(RNDY_EMAIL *= *\).*/\1$EMAIL/" $CONFIG
}

function isUsingGPG {
    echo -n "Already use GPG? (Y/n) "
    read -n 1 -s YES_OR_NO
    echo ""
    if [[ $YES_OR_NO != "n" ]]; then
        encryptMasterPassword
    else
        installGpgKey
    fi
}

function installGpgKey {
    echo -n 'Enter you name: '
    read NAME
    echo ""
    echo "--------------------------"
    echo "Generating GPG-key........"
    echo "--------------------------"
    #gpg --gen-key

cat >foo <<EOF
%echo Generating a standard key
Key-Type: RSA
Key-Length: 1024
Name-Real: $NAME
Name-Comment: Key for master password
Name-Email: $EMAIL
Expire-Date: 0
Passphrase: $MASTERPASSWORD
%pubring pubring.pub
%secring secring.sec
%commit
%echo done
EOF

    gpg --batch --gen-key --yes foo
    gpg --import pubring.pub
    gpg --import secring.sec
    rm foo pubring.pub secring.sec

    encryptMasterPassword
}

function encryptMasterPassword {
    gpg --trust-model always --yes -r $EMAIL -o $HOME/.rndy/rndypassword.gpg -e $tmppass
    rm $tmppass
}

function init {
    mkdir -p $CONFIG_DIR
    touch $CONFIG

    echo -n "Use GPG? (Y/n) "
    read -n 1 -s YES_OR_NO
    echo ""
    if [[ $YES_OR_NO != "n" ]]; then
        cp /usr/share/rndy/example/rndyrc $CONFIG

        setMasterPassword
        setEmail
        isUsingGPG
        exit
    else
        exit 0
    fi
}


echo -n "Rndy was started first time. Do you want to create configuration file? (Y/n) "

read -n 1 -s YES_OR_NO
echo ""

if [[ $YES_OR_NO != "n" ]]; then
    init
else
    exit 0
fi