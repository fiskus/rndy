# Usage

## TUI version

	$ ./getpw-cli -d <domain name> -u <username>

Than master-password promted.

Final password will be set to clipboard (depends on pygtk module on Linux and on pbcopy on MacOS) or print to console on MacOS.

### Command line arguments

`-g`, `--generate-passwords` -- generate password pairs and write it to ~/.psw/pairs

`-b`, `--clipboard` -- ignore config option and output password to system clipboard if can

`-o`, `--raw-output` -- ignore config option and output password to terminal window

### Config

Put this to `~/.pwget.ini`:
	[sites]
	domain1: login1
	domain2: login2

and you have not type username each time

## CGI version

HTML form that pointed to `getpw-cgi.py` should contain

+ `<input id="username" type="text/>`
+ `<input id="domain" type="text"/>` or `<select id="domain"></select>`
+ `<input id="password" type="password" />`

## HOW-TO use it with fun

Dependencies: zsh, python, Firefox with Pentadactyl or Vimperator

### Autogenerating of passwords' pairs

It necesary to omit password prompt each time you call this script.

Put this to `~/.zlogin`:

	if [ ! -e $HOME/.psw/pairs ];
	then
		echo "Genetates password pairs for sites. Type your master-password."
		psw -g
	fi

and this to `~/.zlogout`:

	if [ `ps ax | grep -v grep | grep zsh | wc -l` -eq 1 ];
	then
		rm $HOME/.psw/pairs
	fi

Each time you start zsh, it will check if passwords' pairs exist, and if not -- will create.

Each time you close zsh, it will check any zsh execute, and if not -- will remove passwords pairs.

Bash has such files but with another names.

### Alias

Make symbolic link for this script and add to $PATH

	$ mkdir bin
	$ ln reps/password-manager/pwget-cli bin/psw
	$ echo 'export PATH=$PATH:$HOME/bin/' >> ~/.zshrc

Add aliases for your domain from .config.ini:

	alias psw-livejournal='psw -d livejournal.com'
	alias psw-twitter='psw -d twitter.com'
	alias psw-github='psw -d github.com'

and so on.

### Get passwords in browser

Add following to your `~/.pentadacylrc`:

	command -nargs=1 -description='generate password for site' -complete custom,'[
		\["livejournal.com"],
		\["twitter.com"],
		\["github.com"]
		\psw ! psw -d <args>

execute `:source .pentadactylrc` to load updated config, type command `:psw` and press `Space`. You will see completion list with your sites where you need passwords. Passwords should be previously generated in pairs.
