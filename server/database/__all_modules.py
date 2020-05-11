import datetime
import sqlalchemy
from .__session import SqlAlchemyBase


class Film(SqlAlchemyBase):
    __tablename__ = 'films'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    title = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    description = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    picture = sqlalchemy.Column(sqlalchemy.String,
                                unique=True, nullable=True)
    rate = sqlalchemy.Column(sqlalchemy.String, default='')


class User(SqlAlchemyBase):
    __tablename__ = 'users'

    id = sqlalchemy.Column(sqlalchemy.Integer,
                           primary_key=True, autoincrement=True)
    login = sqlalchemy.Column(sqlalchemy.String, nullable=True, default="Не заполнен")
    email = sqlalchemy.Column(sqlalchemy.String,
                              index=True, unique=True, nullable=True, default="Не заполнен")
    created_date = sqlalchemy.Column(sqlalchemy.DateTime,
                                     default=datetime.datetime.now)
    chat_id = sqlalchemy.Column(sqlalchemy.Integer,
                                nullable=False, unique=True)
    state = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)

    hash = sqlalchemy.Column(sqlalchemy.Integer, nullable=True, default=-1)

