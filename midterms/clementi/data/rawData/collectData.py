""" 
collectData.py
Johnathan Clementi
March, 2022

This script gathers data used to make the Hudson River School of Art mapper and visualizer webpage
"""

from bs4 import BeautifulSoup
import urllib
import regex as re
import requests


# The url to pull data from:
url = "https://en.wikipedia.org/wiki/List_of_Hudson_River_School_artists"

page = requests.get(url).text
# parse the html using beautiful soup and store in variable 'soup'
soup = BeautifulSoup(page, 'html.parser')