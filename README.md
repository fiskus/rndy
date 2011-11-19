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

Put this to ~/.pwget.ini:
	[sites]
	domain1: login1
	domain2: login2

and you have not type username each time

## CGI version

HTML form that pointed to getpw-cgi.py should contain

+ `<input id="username" type="text/>`
+ `<input id="domain" type="text"/>` or `<select id="domain"></select>`
+ `<input id="password" type="password" />`

