from flask import Flask, render_template, request, jsonify
import os
import sys

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the flask app from app.py
from app import app

# Vercel requires a handler function
def handler(request):
    return app(request)

# This makes the app available to Vercel serverless functions
app = app