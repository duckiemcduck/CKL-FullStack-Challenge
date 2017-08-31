import os
from django.db import models
import re
from django.db.models.signals import pre_delete
from django.core.exceptions import SuspiciousFileOperation
from django.dispatch import receiver
from django.contrib.auth.models import User
from creepy_crawly.storage import OverwriteStorage

from string import Template
#https://stackoverflow.com/questions/8189800/django-store-user-image-in-model
def get_authorImage_path(instance, filename):
    return os.path.join('authors', str(instance.name), filename)
def get_articleHero_path(instance, filename):
    return os.path.join('articles', str(instance.title), filename)
def get_defaultAuthor_path(instance, filename):
    return os.path.join('authors','default-author.png')
def get_defaultHero_path(instance, filename):
    return os.path.join('articles','default-hero.png')

class Subject(models.Model):
 name = models.CharField(max_length=100, blank=False, default='')
 color = models.CharField(max_length=100, blank=True, default='')
 def __str__(self):
  return '%s' % (self.name)

class Author(models.Model):
  name = models.CharField(max_length=100, blank=False, default='')
  picture = models.ImageField(upload_to=get_authorImage_path, default='/authors/default-author.png', max_length=255)
  def __str__(self):
   return '%s' % (self.name)
   
class DefaultPicture(models.Model):
  default_author = models.ImageField(max_length=200, storage=OverwriteStorage(), upload_to=get_defaultAuthor_path)
  default_article_header = models.ImageField(max_length=200, storage=OverwriteStorage(), upload_to=get_defaultHero_path)
  #https://stackoverflow.com/questions/12475847/django-admin-disable-user-deletion
  def __str__(self):
   return 'Default author and subject image'
   
class Article(models.Model):
  title = models.CharField(max_length=200, blank=False, default='')
  slug = models.CharField(max_length=200, blank=False, default='')
  author = models.ForeignKey(Author, on_delete=models.CASCADE, blank=False)
  subject = models.ForeignKey(Subject, on_delete=models.CASCADE, blank=False)
  hero_image = models.ImageField(upload_to=get_articleHero_path, default='/articles/default-hero.png', max_length=255)
  publish_date = models.DateField()
  text = models.CharField(max_length=200, blank=False, default='')
  def __str__(self):
   return 'ID: %s | Title: %s | Author: %s | %s | %s' % (self.id, self.title, self.author.name, self.subject.name, self.publish_date.strftime('%d/%m/%Y'))

##Delete Signal Receivers for Images
##https://stackoverflow.com/questions/5372934/how-do-i-get-django-admin-to-delete-files-when-i-remove-an-object-from-the-datab
@receiver(pre_delete, sender=Article)
def picture_delete(sender, **kwargs):
  try:
   photo = kwargs['instance']
   storage, path = photo.hero_image.storage, photo.hero_image.path
   defaultPattern = re.compile("^(.*)(/media/articles/default-hero.png)")
   if defaultPattern.match("/media/authors/default-author.png") is not True:
     storage.delete(path)
   else: 
     pass
  except SuspiciousFileOperation:
   pass
	
@receiver(pre_delete, sender=Author)
def picture_delete(sender, **kwargs):
  try:
   photo = kwargs['instance']
   storage, path = photo.picture.storage, photo.picture.path
   defaultPattern = re.compile("^(.*)(/media/authors/default-author.png)")
   if defaultPattern.match("/media/authors/default-author.png") is not True:
     storage.delete(path)
   else: 
     pass
  except SuspiciousFileOperation:
   pass

