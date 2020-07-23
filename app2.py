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

app2 = Flask(__name__)

@app2.route("/")
def consumption():
    session = Session(engine)

    con_query = session.query(Consumption.Year,Consumption.State,Consumption.TypeOfProducer,Consumption.EnergySource,Consumption.UseOfElectricity).all()
    #con_query = session.query(Consumption).all()
    session.close()

    con_lst = []
    for result in con_query:
        con_lst.append({"Year":result.Year,
        "State":result.State,
        "Producer":result.TypeOfProducer,
        "Source":result.EnergySource,
        "Consumption":result.UseOfElectricity})

    return jsonify(con_lst)

def generation():
    session = Session(engine)

    gen_query = session.query(Generation.Year,Generation.State,Generation.TypeOfProducer,Generation.EnergySource,Generation.Generated).all()
    #con_query = session.query(Consumption).all()
    session.close()

    gen_lst = []
    for result in gen_query:
        gen_lst.append({"Year":result.Year,
        "State":result.State,
        "Producer":result.TypeOfProducer,
        "Source":result.EnergySource,
        "Generated":result.Generated})

    return jsonify(gen_lst)


if __name__ == "__main__":
    app2.run(debug=True)
