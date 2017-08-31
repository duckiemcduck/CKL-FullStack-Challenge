import re 
from utils import getHtmlSoup,  getDatabaseTable

def getSubjectFromArticle(articlePage):
	try:
		subject = articlePage.find('span', attrs={'class':'blue-cat'}).find('a').contents[0]
		return subject[1:].replace('\t',r'')
	except (TypeError, AttributeError):
		return "Infowars Exclusives"


def getArticleDate(articlePage):
	try:
	 	return articlePage.find('span', attrs={'class':'date'}).contents[0]
	except (TypeError, AttributeError):
		return "January 1, 1990"

def getArticleText(articlePage):
	###https://stackoverflow.com/questions/10993612/python-removing-xa0-from-string
	try:
		text = articlePage.find('article').find('p').find('strong').contents[0].replace(u'\xa0', u' ')
	except AttributeError:
		try:
			text = articlePage.find('article').find('p').contents[0].replace(u'\xa0', u' ')
		except TypeError:
			text = "Brought to you by InfoWars"
	except TypeError:
			text = "Brought to you by InfoWars"
	if len(text) > 196:
		text = text[:196]
		text = text + "..."
	else:
		text = text + "..."

	return text
	
def getArticleHero(articlePage):
	try:
		heroImage = "/request/" + articlePage.find('div', attrs={'class':'article-featured-image'}).find('img')['src'][8:]
	except AttributeError:
		heroImage = False
	return heroImage

def getArticleTitle(articlePage):
	title = articlePage.find('h1', attrs={'class':'entry-title'}).string
	if len(title) > 200:
		title = title[:197]
		title = title + "..."
	return title

def getAuthorNameFromArticle(articlePage):
	try: ##These Author names can be inside <a> tags, <strong> tags or merely in the parent <span> tag as content.
		name = articlePage.find('span', attrs={'class':'author'}).find('strong').contents[0].replace('\n', '').replace('\t','').split("|")[0]
	except (TypeError, AttributeError): 
		try:
			name = articlePage.find('span', attrs={'class':'author'}).find('a').contents[0].replace('\n', '').replace('\t','').replace('-','').split("|")[0]
		except (TypeError, AttributeError):
			try:
				name = articlePage.find('span', attrs={'class':'author'}).contents[0].replace('\n', '').replace('\t','').replace('-','').split("|")[0]
			except (TypeError, AttributeError):
				name = "Unknown Author"
	except (TypeError, AttributeError):
		try:
			name = articlePage.find('span', attrs={'class':'author'}).contents[0].replace('\n', '').replace('\t','').replace('-','').split("|")[0]
		except (TypeError, AttributeError):
			name = "Unknown Author"
	return re.sub(r'((\s)*$)', '', name)
	
def getAuthorPortraitFromArticle(articlePage): ##Crawls into the author URL and returns their portrait image url
	try:
		authorPage = getHtmlSoup(articlePage.find('span', attrs={'class':'author'}).find('a', href=True)['href'])
	except (TypeError, AttributeError):
		return False
	try:	
		portraitLink = "/request/" + authorPage.find('div', attrs={'class':'contributor-photo'}).find('img')['src'][8:]
	except (TypeError, AttributeError):
		portraitLink = False
	return	portraitLink
