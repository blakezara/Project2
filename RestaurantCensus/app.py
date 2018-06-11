############## Import Libraries #####################
import datetime as dt
import numpy as np
import pandas as pd
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


from flask import (
    Flask, 
    render_template, 
    jsonify, 
    request, 
    redirect)
################# Flask Setup ##########################

app = Flask(__name__)

#################################################
# sqlite : connect to the existing database
#################################################

engine = create_engine("sqlite:///foodstore_seven.sqlite", echo=False)
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Food = Base.classes.food_seven

session = Session(engine)



###all above is good dont touch#####
#################################################
# Flask Routes
#################################################

# def __repr__(self):
#     return '<Store %r>' % (self.name)

# render index.html
@app.route("/")
def home():
    return render_template("index.html")

####all above is good dont touch#####
# render index.html

@app.route("/state")
def states():
    stmt = session.query(Food).statement
    df = pd.read_sql_query(stmt, session.bind)
    df.set_index('id', inplace=True)
    s = df.groupby(['state'])['zip'].count().to_frame()
    the_states = s.index.tolist()

    return jsonify(the_states[1:])



@app.route("/metadata/<sample>")
def state_data(sample):
    sample_name = sample.replace("state","")
    result = session.query(Food.Population_2014, Food.Median_Household_Income_2014, Food.state, Food.Adult_Diabetes_2014, Food.id).filter_by(state = sample_name).all()
    record = result[0]
    dict_list = {
    "Population_2014": record[0],
    "Median_Household_Income_2014": record[1],
    "state": record[2],
    "Adult_Diabetes_2014": record[3],


}
    return (dict_list)





# Initiate the Flask app
if __name__ == '__main__':
    app.run(debug=True)
