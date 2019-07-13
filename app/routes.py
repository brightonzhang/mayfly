from app import app
from flask import render_template

from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# import time

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/ntf/<id>')
def notification(id):
    return render_template('notification.html', id=id)


@app.route('/msg/<id>')
def message(id):
    # time.sleep(10)

    req = Request('https://file.io/' + id)
    try:
        response = urlopen(req)
    except HTTPError as e:
        print('The server couldn\'t fulfill the request.')
        print('Error code: ', e.code)
        if e.code == 404:
           return render_template('ashes.html')
        return render_template('oops.html')

    except URLError as e:
        print('We failed to reach a server.')
        print('Reason: ', e.reason)    
        return render_template('oops.html')

    else:
        # everything is fine
        content = response.read()
        return render_template('message.html', content=content.decode())

    return render_template('oops.html')

# @app.route('/stub')
# def stub():
#     return render_template('ashes.html')
