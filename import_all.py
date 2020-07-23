# """ import sqlite3
# import json
# from flask import Flask

# def get_tbl(tbl_name):
#     database = r"db.sqlite"
#     conn = sqlite3.connect(database) #create_connection(database)
#     cur = conn.cursor()
#     cur.execute(f"select * from {tbl_name}")
#     temp_tbl = cur.fetchall()
#    # for row in con_tbl:
#     #    print(row)
#     return(temp_tbl)
# #get_tbl("consumption") 
# con_tbl = get_tbl("consumption") 
# gen_tbl = get_tbl("generation") 
# emm_tbl = get_tbl("emissions") 
# con_json = json.dumps(con_tbl)
# gen_json = json.dumps(gen_tbl)
# emm_json = json.dumps(emm_tbl)
# print(type(con_tbl)) """

# import necessary libraries
from models import create_classes
import os
import sqlite3
import json
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
energy = create_classes(db)
# create route that renders index.html template
@app.route("/")
def home():
    def get_tbl(tbl_name):
        database = r"db.sqlite"
        conn = sqlite3.connect(database)
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM {tbl_name}")
        temp_table = cur.fetchall()
        temp_json = json.dumps(temp_table)
        #for row in consumption_table:
        #   print(row)
        return temp_json
    con_json = get_tbl("consumption")
    emi_json = get_tbl("emissions")
    gen_json = get_tbl("generation")
    # with open('consumption.JSON', 'w') as outfile:
    #     json.dump(con_tbl, outfile)
    # with open('emissions.JSON', 'w') as outfile:
    #     json.dump(emi_tbl, outfile)
    # with open('generation.JSON', 'w') as outfile:
    #     json.dump(gen_tbl, outfile)
    return render_template("index.html")
if __name__ == "__main__":
    app.run()