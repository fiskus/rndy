#!/bin/bash

USERNAME=fiskus
COUNT=20

while getopts ":d:u:c:p:o" opt; do
    case $opt in
        #set domain name
        d)
            DOMAIN=$OPTARG
            ;;
        #set username
        u)
            USERNAME=$OPTARG
            ;;
        #set symbols count
        c)
            COUNT=$OPTARG
            ;;
        #set symbols' count
        p)
            MASTERPASSWORD=$OPTARG
            ;;
        #raw output or to xclipboard
        o)
            OUTPUT='RAW'
            ;;
        \?)
            echo "Usage:"
            echo "psw -d google.com -u sergey.brin -c 20"
            echo ""
            echo "Arguments"
            echo "-d\t\t\tdomain"
            echo "-u\t\t\tusername"
            echo "-c\t\t\tsymbols count"
            echo "-p\t\t\tmaster password"
            echo "-o\t\t\toutput to console, not to clipboard"
            ;;
    esac
done


if [[ ! $MASTERPASSWORD ]]; then
    if [[ ! -a $HOME/.masterpassword ]]; then
        echo -n 'Type master-password: '
        read -s MASTERPASSWORD
        echo -n $MASTERPASSWORD > $HOME/.masterpassword
        echo '' #new line for spliting prompt and password
    else
        MASTERPASSWORD=`cat $HOME/.masterpassword`
        chmod 0700 $HOME/.masterpassword
    fi
fi

if [[ $MASTERPASSWORD == "" ]]; then
    echo 'Empty master password. Re-enter.'
    rm $HOME/.masterpassword
fi

PASSWORD=`echo -n $USERNAME$DOMAIN$MASTERPASSWORD | sha1sum | base64 | cut -c 1-$COUNT`

ISTHEREDIGITS=`echo -n $PASSWORD | grep -P '\d'`

if [[ ! $ISTHEREDIGITS ]]; then
    #replace first symbol with count nubmer
    PASSWORD=`echo $PASSWORD | sed 's/^./'$COUNT'/'`
fi

if [[ $OUTPUT ]]; then
    echo $PASSWORD
else
    echo -n $PASSWORD | xclip
fi
