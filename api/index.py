from flask import Flask, render_template, request, jsonify
import os
import sys

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app as application

# Vercel requires this "app" variable
app = application