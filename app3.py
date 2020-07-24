import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///db.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Consumption = Base.classes.consumption
#Generation = Base.classes.generation
#Emissions = Base.classes.emissions

app3 = Flask(__name__)

@app3.route("/")
def consumption():
    session = Session(engine)

    con_query = session.query(Consumption.Year)
    
    
    session.close()

    con_lst = []
    for year in con_query:
        con_dict = {}
        con_dict["Year"] = str(year)
        con_lst.append(con_dict)


    return jsonify(con_lst)

if __name__ == "__main__":
    app3.run(debug=True)
