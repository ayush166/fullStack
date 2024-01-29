from django.urls import path
from . import views

urlpatterns = [
    path('ngrams/', views.generate_ngrams, name='generate_ngrams'),
]
