from flask import Flask, request, render_template
import subprocess


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        password = getPassword(request)

        if request.form.get('ajax'):
            return password
        else:
            return render_template('output.html', password=password)
    else:
        return render_template('rndy.html')


def getPassword(request):
    masterPassword = request.form['password']
    domain = request.form['domain']
    username = request.form['username']
    count = request.form['count']
    password = subprocess.check_output(['./../core/rndy', '-u', username, '-d', domain, '-p', masterPassword, '-c', count, '-o'])
    return password


@app.route('/settings', methods=['GET'])
def settings():
    return render_template('settings.html')


if __name__ == '__main__':
    app.run()
