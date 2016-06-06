---
layout: article
title:  "Hosting your scikit-learn model"
excerpt: "Guide to hosting your scikit-learn model on Algorithmia."
date:   2016-05-16 14:28:42
permalink: /algorithm-development/guides/scikit-guide
tags: [algo-model-guide]
show_related: true
author: steph_kim
image:
    teaser: /language_logos/python.png
---


Welcome to hosting your <a href="http://scikit-learn.org/stable/index.html">scikit-learn</a> model on Algorithmia!
This guide is designed as an introduction to hosting a scikit-learn model and publishing an algorithm even if you’ve never used Algorithmia before.


## Prerequisites
Maybe you've got a great idea or have tirelessly worked on a project in your spare time and you want it to be useful to others. Before you get started hosting your model on Algorithmia there are a few things you'll want to do first:

#### Train your model. 
Say you have a regression model that is predicting the popularity of a product based on various features. You have your training data that has ratings of such products and their associated features. You also have your test data that has the products minus the ratings. You do some data preprocessing and then train your model and validate it with your test data. You're happy with your results and now need to pickle the trained model so you can upload it to Algorithmia. 

#### Pickle your trained model.
Various programming languages have different picklers to choose from. To prepare your model for uploading via our Data API, pick a pickler and save the pickled model locally.

### Create a Data Collection
Now you'll want to create a data collection to host your pickled model.

- To use the Data API, log into your Algorithmia account and create a data collection via the <a href="https://algorithmia.com/data">Data Collections</a> page.

- Click the “Manage Data” link from the user profile icon dropdown in the upper right-hand corner.

- Click on “Add Collection” under the “My Collections” section on your data collections page.

- Set the read and write access on your collection. For more information check out: <a href="http://docs.algorithmia.com/?shell#collection-types">Data Collection Types</a>


<img src="/images/post_images/model_hosting/add_collection.png" alt="Set your dependencies" style="width: 700px;"/>

### Upload your Model into a Collection
Next, upload your pickled model to your newly created data collection.

- Load model by clicking box “Drop files here to upload”

- Note the path to your files: data://username/collections_name/pickled_model.pkl

<img src="/images/post_images/model_hosting/add_collections_visual.png" alt="Create a data collection" style="width: 700px;"/>

### Set your Dependencies
Now is the time to set your dependencies that your model relies on.

- Click on the dependencies button at the top right of the UI and list your packages under the required ones already listed and save at the button on the bottom right corner.

<img src="/images/post_images/model_hosting/dependencies_scikit.png" alt="Set your dependencies" style="width: 700px;"/>

### Create your Algorithm
Creating your alogorithm is easy!

- To add an algorithm, simply click “Add Algortithm” from the user profile icon.
- Name, select the language, choose permissions and make the code either open or closed source.

<img src="/images/post_images/model_hosting/create_new_alg.png" alt="Create your algorithm" style="width: 700px;"/>

### Load your Model
Here is where you load your pickled model that is to be called by the apply() function.
Our recommendation is to preload your model in a separate function before apply(). The reasoning behind this is because when your model is first loaded it can take some time to load depending on the file size. However, with all subsequent calls only the apply() function gets called which will be much faster since your model is already loaded!

{% highlight python %}
import pickle

import Algorithmia
import pandas as pd
import numpy as np
from sklearn.cross_validation import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

client = Algorithmia.client()
test_data_path = 'data://.my/another_test/day.csv'
test_data_name = client.file(test_data_path).getFile().name

def load_model():
    # Get file by name
    # Open file and load model
    file_path = 'data://.my/another_test/scikit-model.pkl'
    model_path = client.file(file_path).getFile().name
    # Open file and load model
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
        return model

model = load_model()

def apply(input):
    # input = {'features': list, 'targ': str}
    # 'features' should be a list of columns that you want
    # your model to use to predict your target
    test = pd.read_csv(test_data_name)
    columns = input['features']
    target = input['targ']
    # Predict our test data
    predict = model.predict(test[columns])
    # Compute the error
    error = mean_squared_error(test[target], predict)
    some_data = {'error': error, 'predict': predict)
    # Do something with your model and return useful output for the user
    return some_data
{% endhighlight %}

### Publish your Algorithm
Last is publishing your algorithm. The best part of hosting your model on Algorithmia is that users can access it via an API that takes only a few lines of code to use!

- Set version permissions to public or private use

- Set it to royalty free or set to per-call royalty

- Set access permissions to have full access to the internet and ability to call other algorithms

- For more information and detailed steps: <a href="http://developers.algorithmia.com/basics/your_first_algo/">creating and publishing your algorithm</a>

<img src="/images/post_images/model_hosting/publish_alg.png" alt="Publish your algorithm" style="width: 700px"/>

That's it for hosting your <a href="http://scikit-learn.org/stable/index.html">scikit-learn</a> model on Algorithmia!

