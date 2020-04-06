from flask import Flask, render_template, request
from json import dumps
import sys

app = Flask(__name__, template_folder="./frontend", static_folder="./frontend")


@app.route("/", methods=["GET", "POST"])
@app.route("/index", methods=["GET", "POST"])
@app.route("/entrance",  methods=["GET", "POST"])
def log():
    if request.method == "GET":
        return render_template("index.html", title="FilmLine")


@app.route("/maintain_films", methods=["GET", "PUT", "POST", "DELETE"])
def films_back():
    if request.method == "GET":
        data = [{"response": "All works!"}]
        return dumps(data)


if __name__ == '__main__' and len(sys.argv) > 2:
    app.run(host=sys.argv[1], port=sys.argv[2])
