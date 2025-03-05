import sys
import os
import tempfile
from gtts import gTTS

try:
    text = sys.argv[1]

    if not text.strip():
        raise ValueError("Empty text input")

    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    output_path = temp_file.name
    temp_file.close()

    # Generate speech
    tts = gTTS(text=text, lang='bn')
    tts.save(output_path)

    # Read and send audio file
    with open(output_path, "rb") as f:
        sys.stdout.buffer.write(f.read())

    # Cleanup
    os.remove(output_path)

except Exception as e:
    sys.stderr.write(f"Error: {str(e)}\n")
    sys.exit(1)
