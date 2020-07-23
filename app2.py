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

app = Flask(__name__)

@app.route("/")
def consumption():
    session = Session(engine)

    con_query = session.query(Consumption.Year,Consumption.State,Consumption.TypeOfProducer,Consumption.EnergySource,Consumption.ConsumptionOfElectricty)

    session.close()

    con_lst = []
    for result in con_query:
        con_lst.append({"Year":result.Year,
        "State":result.State,
        "Producer":result.TypeOfProducer,
        "Source":result.EnergySource,
        "Consumption":result.ConsumptionOfElectricity})

    return jsonify(con_lst)


if __name__ == "__main__":
    app2.run(debug=True)
