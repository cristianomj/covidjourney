from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def post(request, id):
    return render(request, 'frontend/index.html')
