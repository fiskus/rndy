# Usage

## TUI version

	$ ./psw.sh -d <domain name> [-u <username>] [-c <count>] [-p password] [-o]

Than master-password promted.

Default username is fiskus, default symbol's count is 20.

Final password will be set to clipboard (if xclip installed)

## HOW-TO use it with fun

Dependencies: zsh, Firefox with Pentadactyl or Vimperator

### Alias

Make symbolic link for this script and add to $PATH

	$ mkdir bin
	$ ln reps/password-manager/psw.sh bin/psw
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

# How it works

First, calculates hash from password and salt (username and domain). Then encodes to base64 and cut to defined symbols' count.

If resulted number of symbols hasn't digit, than first letter replaced by symbols' count.
