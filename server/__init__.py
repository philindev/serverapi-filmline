from flask import Flask, render_template, request
from json import dumps
from database import __session, __all_modules
from os import environ
from kinopoisk import get_film_url_kinopoisk
from sys import argv

# from OpenSSL import SSL
# context = SSL.Context(SSL.SSL_CB_READ)
# context.use_privatekey_file('server.key')
# context.use_certificate_file('server.crt')


__session.global_init("./database/database.db")
session = __session.create_session()

app = Flask(__name__, template_folder="./frontend", static_folder="./frontend")
KEY = "AAAA_BBBB"


@app.route("/", methods=["GET", "POST"])
@app.route("/index", methods=["GET", "POST"])
@app.route("/entrance",  methods=["GET", "POST"])
def log():
    if request.method == "GET":
        return render_template("hello.html")


@app.route("/full_description", methods=["POST"])
def create_page():
    if request.method == 'POST':
        
        data = request.get_json(force=True)

        current_film = session.query(__all_modules.Film).filter(__all_modules.Film.title == data["title"]).first()
        if current_film is None:
            film = __all_modules.Film()
            film.title = data["title"]
            film.description = data["description"]
            film.picture = data["poster"]
            film.rate = str(data["vote_average"])
            session.add(film)
            session.commit()
            current_film = session.query(__all_modules.Film).filter(__all_modules.Film.title == data["title"]).first()

        if current_film is not None:
            return dumps({"status_code": 200, "key": current_film.id})
        return dumps({"status_code": 501, "message": "Server error!"})


@app.route("/film/<int:key>")
def open_page(key):
    current_film = session.query(__all_modules.Film).filter(__all_modules.Film.id == key).first()
    link = get_film_url_kinopoisk(current_film.title)
    rate = str(int((int(current_film.rate) / 10) * 100))
    return render_template("index.html", title="FilmLine", url=current_film.picture, name=current_film.title, des=current_film.description, rate=rate, link=link)


@app.route("/api/maintain_users/", methods=["GET", "POST"])
def films_back():
    """
        method can be:
        1) user_info -> return all info about user : GET
        2) state -> change state to current (params: state) : GET
        3) change -> change some fields (params: fields -> Obj) : POST
        4) new -> add new user : GET
        5) check_user -> check existing of user

        require param:
        chat_id - Integer
        apikey - String

        NOTE: params POST request cam be all named in table User
    """
    key = request.args.get("apikey")
    method = request.args.get("method")
    if key != KEY:
        return dumps({"status_code": 401, "message": "APIKey is not valid"})
    if request.method == "GET":
        chat_id = request.args.get("chat_id")
        if method == "new":
            user = __all_modules.User()
            user.chat_id = chat_id
            user.state = 0
            session.add(user)
            session.commit()
            return dumps({"status_code": 200, "message": "User successfully added"})
        if method == "exist":
            res = session.query(__all_modules.User).filter(__all_modules.User.chat_id == chat_id).first()
            if res is None:
                return dumps({"status_code": 200, "boolean": False})
            return dumps({"status_code": 200, "boolean": True})
        current = session.query(__all_modules.User).filter(__all_modules.User.chat_id == chat_id).first()
        if current is None:
            return dumps({"status_code": 501, "message": "The user has not exist"})
        if method == "delete":
            delete = __all_modules.User.__table__.delete().where(__all_modules.User.chat_id == chat_id)
            session.execute(delete)
            session.commit()
            return dumps({"status_code": 200, "message": "User successfully deleted"})
        if method == "user_info":
            user = {
                "email": current.email,
                "login": current.login,
                "chat_id": current.chat_id,
                "state": current.state,
                "hash": current.hash,
            }
            return dumps(user)
        if method == "state":
            current.state = int(request.args.get("state"))
            session.commit()
            return dumps({"status_code": 200, "message": "State successfully changed"})
        else:
            return dumps({"status_code": 404, "message": "Method does not exist"})
    elif request.method == "POST":
        chat_id = request.args.get("chat_id")
        current = session.query(__all_modules.User).filter(__all_modules.User.chat_id == chat_id).first()
        if method == "change":
            data = request.get_json(force=True)
            for i in list(data.keys()):
                if i == "email":
                    current.email = data[i]
                elif i == "login":
                    current.login = data[i]
                elif i == "hash":
                    current.hash = data[i]
                elif i == "state":
                    current.state = data[i]
            session.commit()
            return dumps({"status_code": 200, "message": "User info successfully changed"})
        else:
            return dumps({"status_code": 404, "message": "Method does not exist"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(environ.get('PORT', 5000)))
    # app.run(host=argv[1], port=argv[2], debug=True)
    session.close()
