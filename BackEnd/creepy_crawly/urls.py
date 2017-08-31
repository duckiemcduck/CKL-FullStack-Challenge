from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from creepy_crawly import views
urlpatterns = [
 url(r'^v1/subjects/$', views.subject_list),
 url(r'^v1/subjects/(?P<pk>[0-9]+)/$', views.subject_detail),
 url(r'^v1/authors/$', views.author_list),
 url(r'^v1/authors/(?P<pk>[0-9]+)/$', views.author_detail),
 url(r'^v1/articles/$', views.ArticleList.as_view()),
 url(r'^v1/articles/(?P<pk>[0-9]+)/$', views.ArticleDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
