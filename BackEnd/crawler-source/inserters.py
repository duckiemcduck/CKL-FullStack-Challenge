import psycopg2
import datetime
from utils import getHtmlSoup,  getDatabaseTable
from utils import ARTICLES, SUBJECTS, AUTHORS, DEFAULT_COLOR, DEFAULT_HERO, DEFAULT_AUTHOR
from scrapers import getSubjectFromArticle, getArticleDate, getDatabaseTable, getAuthorNameFromArticle
from scrapers import getAuthorPortraitFromArticle, getArticleText, getArticleHero, getArticleTitle

def insertFromURL(pageURL, databaseConnection):
	try:
		print("Scraping " + pageURL + " on " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
		dbCur = databaseConnection.cursor() ##Cursor to interact with the connected database 
		htmlSoup = getHtmlSoup(pageURL)
		####### Fetch Articles
		articleList = htmlSoup.find_all('article')
		for retrievedArticle in articleList:
			articleURL = retrievedArticle.find('a', href=True)['href']
			articlePage = getHtmlSoup(articleURL)
			if compareArticles(articleURL, dbCur) is not True:
				insertAuthor(articlePage, dbCur)
				databaseConnection.commit()
				insertSubject(articlePage, dbCur)
				databaseConnection.commit()
				insertArticle(articleURL, dbCur)
				databaseConnection.commit()
	except Exception as error:
		print(error)
		databaseConnection.rollback()
		print("Something wrong happened while scraping " + pageURL + " \n Their server could be under maintenance or the connection was disrupted. \n Skipping...")

def insertArticle(articleURL, databaseCursor):
	articlePage = getHtmlSoup(articleURL)
	publish_date = getArticleDate(articlePage)
	hero_image = getArticleHero(articlePage)
	if bool(hero_image) == False:
		hero_image=DEFAULT_HERO
	subject = getSubjectFromArticle(articlePage)
	author = getAuthorNameFromArticle(articlePage)
	title = getArticleTitle(articlePage)
	text = getArticleText(articlePage)
	try:
		databaseCursor.execute("INSERT INTO "+ ARTICLES +" (title, slug, author_id, subject_id, hero_image, publish_date, text) VALUES ('" + title + "','" + articleURL + "', (SELECT id FROM " + AUTHORS + " WHERE name = '"+ author +"'),(SELECT id FROM " + SUBJECTS + " WHERE name = '"+ subject +"'),'" + hero_image + "','" + publish_date + "','" + text + "');")
		print("inserted article: " + articleURL)
		print("inserted hero: " + hero_image)
	except (psycopg2.OperationalError, psycopg2.IntegrityError):
		print("Error including article:" + articleURL)
	##https://stackoverflow.com/questions/1997998/insert-data-into-tables-linked-by-foreign-key
	
def insertAuthor(articlePage, databaseCursor):
	dbAuthors = getDatabaseTable(AUTHORS, databaseCursor)
	name =  getAuthorNameFromArticle(articlePage)
	for dbAuthor in dbAuthors:
		if dbAuthor[1].upper() == name.upper():
			return False
	picture =  getAuthorPortraitFromArticle(articlePage)
	if bool(picture) == False:
		picture = DEFAULT_AUTHOR
	print("inserted author: " + name)
	print("inserted author portrait: " + picture)
	try:
		databaseCursor.execute("INSERT INTO " + AUTHORS + " (name, picture) VALUES ('" + name + "','" + picture + "');")
	except (psycopg2.OperationalError, psycopg2.IntegrityError):
			print("Error including author:" + name)

def insertSubject(articlePage, databaseCursor):
	dbSubjects = getDatabaseTable(SUBJECTS, databaseCursor)
	name =  getSubjectFromArticle(articlePage)
	#print("Subject candidate: " + name)
	for dbSubject in dbSubjects:
		#print("Subject in db:" + dbSubject[1])
		if dbSubject[1] == name:
			return False
	try:
		databaseCursor.execute("INSERT INTO " + SUBJECTS + " (name, color) VALUES ('" + name + "','" + DEFAULT_COLOR + "');")
		print("inserted subject: " + name)
	except (psycopg2.OperationalError, psycopg2.IntegrityError):
			print("Error including subject:" + name)


def insertSubjectsFromList(databaseSubjects, fetchedSubjectList, databaseCursor): ## Checks each subject on the list for duplicates in database, inserts them if there's no match
	for retrievedSubject in fetchedSubjectList.find_all('a', href=True)[1:]: ##Start from the second listed element as the first one isn't a subject
		compareSubjects(databaseSubjects, retrievedSubject.contents[0], databaseCursor);

def compareSubjects(dbValues,input, databaseCursor): #This function checks if the subject is already a value in the database, pushing it into the db with the defined default color if not.
	proceed = 1;
	for dbValue in dbValues:
		if  dbValue[1].upper() == input.upper():
		 proceed = 0;
	if proceed:
		try:
			databaseCursor.execute("INSERT INTO "+ SUBJECTS + " (name, color) VALUES ('" + input + "','" + DEFAULT_COLOR + "');")
		except (psycopg2.OperationalError, psycopg2.IntegrityError):
			print("Error including subject:" + input)

def compareArticles(articleURL, databaseCursor):
	dbValues = getDatabaseTable(ARTICLES, databaseCursor)
	for dbValue in dbValues:
		if dbValue[2] == articleURL:
			return True;
	return False

