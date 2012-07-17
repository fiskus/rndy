# Usage

## TUI version

	$ ./psw.sh -d <domain name> -u <username>

Than master-password promted.

Final password will be set to clipboard (if xclip installed)

## HOW-TO use it with fun

Dependencies: zsh, Firefox with Pentadactyl or Vimperator

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
