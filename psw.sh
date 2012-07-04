#!/bin/bash

# Use power of GNU/Linux:
#  echo -n '$USERNAME$DOMAIN$MASTERPASWWORD' | shasum | base64 | cut -c 1-20

while getopts ":d:u:" opt; do
    case $opt in
        d)
            DOMAIN=$OPTARG
            ;;
        u)
            USERNAME=$OPTARG
            ;;
        \?)
            echo "Usage:"
            echo "psw -d google.com -u sergey"
            ;;
    esac
done

read -s MASTERPASWWORD

echo -n $USERNAME$DOMAIN$MASTERPASWWORD | sha1sum | base64 | cut -c 1-20
