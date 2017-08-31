import os
import time
import psycopg2
from inserters import insertFromURL
from utils import getHtmlSoup, seconds, minutes, days
###### Definitions 
frontPageURL = "https://www.infowars.com/news/"
db = False;
waitTime = 30 * minutes
######

while (db is not True):
	try:
		db = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host="db", port=5432)
		break
	except psycopg2.OperationalError:	
			print("Crawler: Connection to db could not be established. Retrying...")
			time.sleep(1)

if db.status:
	####### Setup
	htmlSoup = getHtmlSoup(frontPageURL)
	insertFromURL(frontPageURL,db) ##Inserts the frontpage beforehand
	####### Fetch Articles from Subject List
	try:
		subjectList = htmlSoup.find('li', attrs={'id': 'menu-item-216953'}).find_all('a', href=True)[1:] ##The subject list is in a <li> list tag with the id 'menu-item-216953'
		for subjectListing in subjectList:
			insertFromURL(subjectListing['href'], db)
	except AttributeError:
		print("Something happened while getting subjects list. ID may have changed or site may be offline")
	finally:
		while True:
			if db.status:
				print("Sleeping for " + str(waitTime/minutes) + " minutes...")
				time.sleep(waitTime) 
				insertFromURL(frontPageURL,db)
			else:
				print("Something happened with the database connection. DB Status: " + db.status)
else:
	print("Something happened with the database connection. DB Status: " + db.status)

