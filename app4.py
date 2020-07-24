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
Generation = Base.classes.generation
Emissions = Base.classes.emissions

app4 = Flask(__name__)
@app4.route("/")
def welcome():
    return ("hello")
@app4.route("/consumption")
def consumption():
    session = Session(engine)
    con_query = session.query(
    Consumption.Year,
    #Consumption.State,
    #Consumption.TypeOfProducer,
    #Consumption.EnergySource,
    Consumption.UseOfElectricity)
    session.close()
    year_lst = []
    use_lst = []
    for year_, use_ in con_query:
        year_lst.append(str(year_))
        use_lst.append(int(use_))
    con_dict = {}
    con_dict["Year"] = year_lst
    con_dict["UseOfElectricity"] = use_lst
    return jsonify(con_dict)


if __name__ == "__main__":
    app4.run(debug=True)
