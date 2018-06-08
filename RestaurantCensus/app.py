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
    fuckers = s.index.tolist()

    return jsonify(fuckers[1:])



# # otu_id's
# @app.route("/otu", methods=['POST','GET'])
# def otu():

#     otu_desc = session.query(OTU.lowest_taxonomic_unit_found).all()
#     otu_descriptions = [i[0] for i in otu_desc]
#     return jsonify(otu_descriptions)

# # metadata for a specific sample
# @app.route('/metadata/<sample>', methods=['POST','GET'])
# def metadata(sample):

#     results = session.query(SamplesMetadata).filter(SamplesMetadata.SAMPLEID == sample[3:]).all()
#     dict1 = {}
#     for k,v in results[0].__dict__.items():
#         if ('AGE' in k or 'BBTYPE' in k or 'ETHNICITY' in k or 'GENDER' in k or 'LOCATION' in k or 'SAMPLEID' in k):
#             dict1[k] = v

#     return jsonify(dict1)
    
# # washing frequency for a specific sample
# @app.route('/wfreq/<sample>', methods=['POST','GET'])
# def wfreq(sample):

#     results = session.query(SamplesMetadata.WFREQ).filter(SamplesMetadata.SAMPLEID == sample[3:]).all()
    
#     return jsonify(results[0][0])

# # otu_id's and corresponding sample count in descending order 
# # for a specific sample
# @app.route('/samples/<sample>', methods=['POST','GET'])
# def samples(sample):

#     results = session.query(Samples.otu_id,getattr(Samples, sample)).order_by(getattr(Samples, sample).desc()).all()
#     results
#     dict1 = {}
#     dict2 = {}
#     list1 = []
#     list2 = []
#     list3 = []
#     for x in results:
#         if(x[1] > 0):
#             list1.append(x[0])
#             list2.append(x[1])
#     dict1['otu_id'] = list1
#     dict1['sample_values'] = list2
#     list3.append(dict1)
#     list3

#     return jsonify(list3)


# Initiate the Flask app
if __name__ == '__main__':
    app.run(debug=True)
