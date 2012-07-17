if [ `ps ax | grep -v grep | grep zsh | wc -l` -eq 1 ];
then
	rm $HOME/.masterpassword
fi
