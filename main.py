from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_image():
    prompt = request.json.get('prompt', '')
    # Placeholder for image generation logic
    # In a real implementation, you would integrate with an AI image generation API
    return jsonify({
        'success': True,
        'image_url': '/static/placeholder.jpg',  # Placeholder image
        'message': f'Image generated for prompt: "{prompt}"'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
