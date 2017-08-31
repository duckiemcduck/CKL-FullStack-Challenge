from rest_framework import serializers
from creepy_crawly.models import Subject, Author, Article
from rest_framework.utils.urls import replace_query_param
##
##Subject
##
class SubjectSerializer(serializers.ModelSerializer):
 class Meta:
  model = Subject	
  fields = ('id', 'name', 'color')
##
##Author
#### Basic serializer does not return image path
class AuthorSerializer(serializers.ModelSerializer):
 class Meta:
  model = Author	
  fields = ('id', 'name', 'picture')

class AuthorBasicSerializer(serializers.ModelSerializer):
 class Meta:
  model = Author	
  fields = ('id', 'name',)
##
##Article
#### Basic serializer does not return image path

class ArticleSerializer(serializers.ModelSerializer):
 class Meta:
  model = Article
  depth = 1
  fields = ('id', 'title','slug','author','subject','hero_image','publish_date','text')

class ArticleBasicSerializer(serializers.ModelSerializer):
 text = serializers.CharField(max_length=200)
 class Meta:
  model = Article
  depth = 1
  fields = ('id', 'title','slug','author','subject', 'hero_image','publish_date','text')
