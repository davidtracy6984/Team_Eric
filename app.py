import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


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
Solar = Base.classes.SolarSurge
Wind = Base.classes.WindGrowth
Emission_1 = Base.classes.EmissionsbyEndUse
Emission_2 = Base.classes.SectorEmissions

app = Flask(__name__)
@app.route("/")

def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/consumption")

def consumption():
    session = Session(engine)

    con_query = session.query(
    Consumption.Year,
    Consumption.State,
    Consumption.TypeOfProducer,
    Consumption.EnergySource,
    Consumption.UseOfElectricity)

    session.close()

    con_lst = []
    for year,state,typeofproducer,energysource,useofelectricity in con_query:
        con_dict = {}
        con_dict["Year"] = str(year)
        con_dict["State"] = state
        con_dict["TypeOfProducer"] = typeofproducer
        con_dict["EnergySource"] = energysource
        con_dict["UseOfElectricity"] = int(useofelectricity)
        con_lst.append(con_dict)


    return jsonify(con_lst)

@app.route("/generation")
def generation():
    session = Session(engine)

    gen_query = session.query(
    Generation.Year,
    Generation.State,
    Generation.TypeOfProducer,
    Generation.EnergySource,
    Generation.Generated)

    session.close()

    gen_lst = []
    for year,state,typeofproducer,energysource,generated in gen_query:
        gen_dict = {}
        gen_dict["Year"] = year
        gen_dict["State"] = state
        gen_dict["TypeOfProducer"] = typeofproducer
        gen_dict["EnergySource"] = energysource
        gen_dict["Generated"] = int(generated)
        gen_lst.append(gen_dict)

    return jsonify(gen_lst)

@app.route("/emissions")
def emissions():
    session = Session(engine)

    emm_query = session.query(
        Emissions.Year,
        Emissions.State,
        Emissions.TypeOfProducer,
        Emissions.EnergySource,
        Emissions.C02,
        Emissions.S02,
        Emissions.N0x)

    session.close()

    emm_lst = []
    for year,state,typeofproducer,energysource,c02,s02,n0x in emm_query:
        emm_dict = {}
        emm_dict["Year"] = str(year)
        emm_dict["State"] = state
        emm_dict["TypeOfProducer"] = typeofproducer
        emm_dict["EnergySource"] = energysource
        emm_dict["C02"] = c02
        emm_dict["S02"] = s02
        emm_dict["N0x"] = n0x
        emm_lst.append(emm_dict)


    return jsonify(emm_lst)

@app.route("/solar")
def solar():
    session = Session(engine)

    sol_query = session.query(
        Solar.Year,
        Solar.State,
        Solar.GWH)

    session.close()

    sol_lst = []
    for year,state,gwh in sol_query:
        sol_dict = {}
        sol_dict["Year"] = str(year)
        sol_dict["State"] = state
        sol_dict["GWH"] = GWH

    return jsonify(sol_lst)

@app.route("/wind")
def wind():
    session = Session(engine)

    wind_query = session.query(
        Wind.Year,
        Wind.State,
        Wind.GWH)

    session.close()

    wind_lst = []
    for year,state,gwh in wind_query:
        wind_dict = {}
        wind_dict["Year"] = str(year)
        wind_dict["State"] = state
        wind_dict["GWH"] = GWH

    return jsonify(wind_lst)

@app.route("/emission_1")
def emission_1():
    session = Session(engine)

    em1_query = session.query(
        Emission_1.UseSector,
        Emission_1.UsePercentage)

    session.close()

    em1_lst = []
    for sector,percentage in em1_query:
        em1_dict = {}
        em1_dict["UseSector"] = sector
        em1_dict["UsePercentage"] = percentage

    return jsonify(em1_lst)

@app.route("/emission_2")
def emission_2():
    session = Session(engine)

    em2_query = session.query(
        Emission_2.UseSector,
        Emission_2.UsePercentage)

    session.close()

    em2_lst = []
    for sector,percentage in em2_query:
        em2_dict = {}
        em2_dict["UseSector"] = sector
        em2_dict["UsePercentage"] = percentage

    return jsonify(em2_lst)


if __name__ == "__main__":
    app.run(debug=True)
