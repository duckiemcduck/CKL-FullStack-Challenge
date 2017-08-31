import requests
import psycopg2
from bs4 import BeautifulSoup

### DB Table names
SUBJECTS = "creepy_crawly_subject"
AUTHORS = "creepy_crawly_author"
ARTICLES = "creepy_crawly_article"
### Default Values
DEFAULT_HERO = "/articles/default-hero.png"
DEFAULT_AUTHOR = "/authors/default-author.png"
DEFAULT_COLOR = "black"
### Time definitions
seconds = 1
minutes = 60
days = 1440
### Soup Handler Function
def getHtmlSoup(ingredientUrl):
	try:
		return BeautifulSoup(requests.get(ingredientUrl).content, 'html.parser')
	except KeyboardInterrupt: 
		raise 
		##http://effbot.org/zone/stupid-exceptions-keyboardinterrupt.htm
	except Exception as error:
		print(error)
		print("Failed to get soup request.")

### Database table retrieve function
def getDatabaseTable(Table, dataBaseConnectionCursor):
	try:
		dataBaseConnectionCursor.execute("SELECT * FROM " + Table +  ";")
	except Exception as error: 
		print(error)
		print("Failed to get table " + Table)
		return ['','','']
	return dataBaseConnectionCursor.fetchall()

