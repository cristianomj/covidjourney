from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')

def blogPost(request, id):
    return render(request, 'frontend/index.html')

def signUp(request):
    return render(request, 'frontend/index.html')

def signIn(request):
    return render(request, 'frontend/index.html')

def verify(request, uid, token):
    return render(request, 'frontend/index.html')

def profile(request):
    return render(request, 'frontend/index.html')
