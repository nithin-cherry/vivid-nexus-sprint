# ScanFusion 🚀

**ScanFusion** is a professional, high-performance Barcode Generator & Scanner web application. Built with a premium dark-mode UI, it processes everything 100% in-memory (zero disk usage) for lightning-fast performance and security.

---

## ✨ Features

- **Multi-Format Generation**: Instantly generate `Code128`, `EAN-13`, and `Code39` barcodes.
- **Live Camera Scanner**: Scan barcodes directly from your webcam in real-time.
- **Image Upload Scanning**: Drag & Drop images to extract barcode data.
- **In-Memory Processing**: No files are ever saved to the server's hard drive. All generation and decoding happens in RAM.
- **Export Options**: Download generated barcodes in high-quality SVG or PNG formats.
- **Premium UI**: Hand-crafted glassmorphism design with smooth scroll-reveal animations.

---

## 🛠️ Tech Stack

- **Backend**: Python 3, Flask
- **Barcode Engine**: `python-barcode` (Generation), `OpenCV` & `pyzbar` (Scanning)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
- **Design**: FontAwesome Icons, Google Fonts (Poppins)

---

## 🚀 How to Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
- Python 3.9+ installed
- *(Windows only)* Microsoft Visual C++ Redistributable (Required for OpenCV/PyZbar to function)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ScanFusion.git
   cd ScanFusion
   ```

2. **Create and activate a virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate on Windows:
   .\venv\Scripts\activate
   
   # Activate on macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the application**
   ```bash
   python app.py
   ```

5. **View the App**
   Open your browser and navigate to: `http://localhost:5000`

---

## 📂 Folder Structure

```text
📦 ScanFusion
 ┣ 📂 core/                # Core Python logic
 ┃ ┣ 📜 generator.py       # In-memory barcode generation
 ┃ ┗ 📜 scanner.py         # In-memory OpenCV/PyZbar decoding
 ┣ 📂 static/              # Frontend assets
 ┃ ┣ 📂 css/style.css      # Premium dark mode styles
 ┃ ┗ 📂 js/script.js       # Camera and API logic
 ┣ 📂 templates/           
 ┃ ┗ 📜 index.html         # Main SPA interface
 ┣ 📜 app.py               # Flask routing
 ┗ 📜 requirements.txt     # Python dependencies
```

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify it!