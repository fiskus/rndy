# Installation

## On Archlinux

    $ yaourt -S --noconfirm rndy-git

or if you haven't yaourt

    $ wget https://aur.archlinux.org/packages/do/rndy-git/PKGBUILD
    $ makepkg -s
    $ sudo pacman -U rndy-git-*-any.pkg.tar.xz
    $ rm -rf PKGBUILD pkg src rndy-git-*-any.pkg.tar.xz

# Usage

## TUI version

	$ rndy -d <domain name> [-u <username>] [-p password] [-c <count>] [-o]

Than master-password promted.

Default username is fiskus, default symbol's count is 20.

Final password will be set to clipboard (xclip needed)

## HOW-TO use it with fun

Dependencies: zsh, Firefox with Pentadactyl or Vimperator

### Alias

Make symbolic link for this script and add to $PATH

	$ mkdir bin
	$ ln reps/rndy/core/rndy bin/rndy
	$ echo 'export PATH=$PATH:$HOME/bin/' >> ~/.zshrc

Add aliases for your domain from .config.ini:

	alias rndy-livejournal='rndy -d livejournal.com'
	alias rndy-twitter='rndy -d twitter.com'
	alias rndy-github='rndy -d github.com'

and so on.

### Get passwords in browser

Add following to your `~/.pentadacylrc`:

	command -nargs=1 -description='generate password for site' -complete custom,'[
		\["livejournal.com"],
		\["twitter.com"],
		\["github.com"]
		\rndy ! rndy -d <args>

execute `:source .pentadactylrc` to load updated config, type command `:rndy` and press `Space`. You will see completion list with your sites where you need passwords. Passwords should be previously generated in pairs.

# How it works

First, calculates hash from password and salt (username and domain). Then encodes to base64 and cut to defined symbols' count.

If resulted number of symbols hasn't digit, than first letter replaced by symbols' count.
