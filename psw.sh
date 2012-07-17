#!/bin/bash

USERNAME=fiskus
COUNT=20

while getopts ":d:u:c:" opt; do
    case $opt in
        d)
            DOMAIN=$OPTARG
            ;;
        u)
            USERNAME=$OPTARG
            ;;
        c)
            COUNT=$OPTARG
            ;;
        \?)
            echo "Usage:"
            echo "psw -d google.com -u sergey"
            ;;
    esac
done

echo -n 'Type master-password: '

if [ ! -a $HOME/.masterpassword ]; then
    read -s MASTERPASSWORD
    echo -n $MASTERPASSWORD > $HOME/.masterpassword
else
    MASTERPASSWORD=`cat $HOME/.masterpassword`
    chmod 0700 $HOME/.masterpassword
fi

echo $COUNT
echo -n $USERNAME$DOMAIN$MASTERPASSWORD | sha1sum | base64 | cut -c 1-$COUNT
