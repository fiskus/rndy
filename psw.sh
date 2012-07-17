#!/bin/bash

USERNAME=fiskus
COUNT=20

while getopts ":d:u:c:p:" opt; do
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
        p)
            MASTERPASSWORD=$OPTARG
            ;;
        \?)
            echo "Usage:"
            echo "psw -d google.com -u sergey -c 20"
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

PASSWORD=`echo -n $USERNAME$DOMAIN$MASTERPASSWORD | sha1sum | base64 | cut -c 1-$COUNT`

#echo -n $PASSWORD | xclip

echo $PASSWORD
