import json
#from django.shortcuts import redirect
from django.http import StreamingHttpResponse, Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from creepy_crawly.models import Subject,Author,Article
from creepy_crawly.serializers import SubjectSerializer,AuthorBasicSerializer,AuthorSerializer,ArticleSerializer,ArticleBasicSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render
from rest_framework import viewsets  
from rest_framework.pagination import PageNumberPagination
from rest_framework import mixins
from rest_framework import generics
from django.core.exceptions import ValidationError
class SmallPagesPagination(PageNumberPagination):
    page_size = 6

@api_view(['GET'])
def subject_list(request, format=None):
    if request.method == 'GET':
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return StreamingHttpResponse(json.dumps(serializer.data, sort_keys=True, indent=4, separators=(',', ': ')), content_type='application/json')
##
##
## Subject views
##
##
@api_view(['GET'])
def subject_detail(request, pk, format=None):
    try:
        subject = Subject.objects.get(pk=pk)
    except Subject.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
	 #return redirect('/api/v0/subjects/')

    if request.method == 'GET':
        serializer = SubjectSerializer(subject)
        return StreamingHttpResponse(json.dumps(serializer.data, sort_keys=True, indent=4, separators=(',', ': ')), content_type='application/json')
##
##
## Author views
##
##
@api_view(['GET'])
def author_list(request, format=None):
    if request.method == 'GET':
        authors = Author.objects.all()
        serializer = AuthorBasicSerializer(authors, many=True)
        return StreamingHttpResponse(json.dumps(serializer.data, sort_keys=True, indent=4, separators=(',', ': ')), content_type='application/json')

@api_view(['GET'])
def author_detail(request, pk, format=None):
    try:
        author = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
	 #return redirect('/api/v0/subjects/')

    if request.method == 'GET':
        serializer = AuthorBasicSerializer(author)
        return StreamingHttpResponse(json.dumps(serializer.data, sort_keys=True, indent=4, separators=(',', ': ')), content_type='application/json')
##
##
## Article views
##
##

class ArticleList(generics.ListAPIView):
 queryset = Article.objects.all()
 serializer_class = ArticleBasicSerializer
 pagination_class = SmallPagesPagination
 def get_queryset(self):
        queryset = Article.objects.all().order_by('-publish_date','-id')
        subject = self.request.query_params.get('subject', None)
        if subject is not None:
         try:
          queryset = queryset.filter(subject=subject)
         except ValueError:
          queryset = Article.objects.all().order_by('-publish_date','-id')
        return queryset

class ArticleDetail(APIView):
 def get_object(self, pk):
  try:
    return Article.objects.get(pk=pk)
  except Author.DoesNotExist:
    raise Http404

 def get(self, request, pk, format=None):
  article = self.get_object(pk)
  serializer = ArticleBasicSerializer(article)
  return Response(serializer.data)

"""
@api_view(['GET'])
def article_list(request, format=None):
    if request.method == 'GET':
     queryset = Article.filter_queryset(Author.get_queryset())
     page = Article.paginate_queryset(queryset)
     if page is not None:
      serializer = Author.get_serializer(page, many=True)
      return Author.get_paginated_response(serializer.data)

     serializer = self.get_serializer(queryset, many=true)
     return Response(serializer.data) 

@api_view(['GET'])
def article_detail(request, pk, format=None):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
         return Response(status=status.HTTP_404_NOT_FOUND)
	 #return redirect('/api/v0/subjects/')

    if request.method == 'GET':
        serializer = ArticleBasicSerializer(article)
        return StreamingHttpResponse(json.dumps(serializer.data, sort_keys=True, indent=4, separators=(',', ': ')), content_type='application/json')

# Create your views here.
"""
