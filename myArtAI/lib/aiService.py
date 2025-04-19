from flask import Flask, request, jsonify
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)
client = genai.Client(api_key="AIzaSyDx5omW0sjgjevdw3LoeY74zDryHvnIJ2A")

@app.route('/generate-image', methods=['POST'])
def generate_image():
    print("🔵 Received request at /generate-image")

    data = request.get_json()
    print(f"📦 Incoming JSON: {data}")

    base64_image = data.get('image')
    prompt = data.get('prompt', 'Create a stylized image.')

    if not base64_image:
        print("❌ No image data received.")
        return jsonify({'error': 'No image provided'}), 400

    try:
        image_data = base64.b64decode(base64_image)
        print("✅ Image data decoded from base64.")

        image = Image.open(BytesIO(image_data))
        print(f"🖼️ Image opened: {image.format}, {image.size}, {image.mode}")

        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        buffer.seek(0)
        image_bytes = buffer.read()

        print("🧱 Creating content parts...")
        image_part = types.Part(
            inline_data=types.Blob(mime_type='image/jpeg', data=image_bytes)
        )

        response = client.models.generate_content(
            model='gemini-2.0-flash-exp-image-generation',
            contents=[
                types.Part(text=prompt),
                image_part
            ],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE']
            )
        )

        print("✅ Response received from Gemini.")

        for part in response.candidates[0].content.parts:
            if part.text:
                print(f"📝 Text response: {part.text}")
            if part.inline_data:
                print(f"🖼️ Found image data in response.")
                result_base64 = base64.b64encode(part.inline_data.data).decode('utf-8')
                return jsonify({'image': result_base64})

        print("⚠️ No image data found in response.")
        return jsonify({'error': 'No image in response'}), 500

    except Exception as e:
        print(f"🔥 Error occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
