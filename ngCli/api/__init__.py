import sys
from flask import *
from flask_cors import CORS
from datetime import timedelta
from functools import update_wrapper
sys.path.append('Scripts')
import parseProtein
import parseRotation
import parseTest

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, str):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, str):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

app = Flask(__name__)
CORS(app)

@app.route('/dataTags', methods=['POST', 'GET', 'OPTIONS'])
@crossdomain(origin='*')
def tagReturn():
    return parseProtein.toJSON(request.args['pdbFile'])

@app.route('/dataTest', methods=['POST', 'GET', 'OPTIONS'])
@crossdomain(origin='*')
def testReturn():
    return parseTest.toJSON(request.args['name'])

@app.route('/dataRotation', methods=['POST', 'GET', 'OPTIONS'])
@crossdomain(origin='*')
def rotationReturn():
    return parseRotation.toJSON(request.args['data'],request.args['type'])

if __name__ == '__main__':
    app.run(debug=True)