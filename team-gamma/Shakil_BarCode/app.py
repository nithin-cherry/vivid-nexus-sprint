import os
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from core.generator import generate_barcode
from core.scanner import scan_barcode

app = Flask(__name__)

# Max upload limit (16MB) to prevent memory exhaustion
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    if not data or 'text' not in data or 'type' not in data:
        return jsonify({'error': 'Missing barcode text or type'}), 400
    
    text = data['text'].strip()
    barcode_type = data['type'].lower()
    
    if not text:
        return jsonify({'error': 'Barcode text cannot be empty'}), 400
        
    try:
        # Generate base64 data URIs directly from memory
        png_data_uri = generate_barcode(text, barcode_type, format='png')
        svg_data_uri = generate_barcode(text, barcode_type, format='svg')
        
        return jsonify({
            'success': True,
            'message': 'Barcode generated successfully',
            'png_url': png_data_uri,
            'svg_url': svg_data_uri,
            'value': text,
            'type': barcode_type
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/scan', methods=['POST'])
def scan():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
        
    file = request.files['image']
    if not file or file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    try:
        # Read the file directly into memory
        image_bytes = file.read()
        
        # Scan from memory
        result = scan_barcode(image_bytes)
        
        if result:
            return jsonify({
                'success': True,
                'value': result['data'],
                'type': result['type']
            })
        return jsonify({'error': 'No barcode found in image'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
