# Usage

## TUI version

	$ ./getpw-cli -u <username> -d <domain name>

Than master-password promted.

Final password will be set to clipboard on Linux (depends on pygtk module) or print to console on MacOS.

## CGI version

HTML form that pointed to getpw-cgi.py should contain

+ `<input id="username" type="text/>`
+ `<input id="domain" type="text"/>` or `<select id="domain"></select>`
+ `<input id="password" type="password" />`

## TODO

* config with predefined domains and usernames
