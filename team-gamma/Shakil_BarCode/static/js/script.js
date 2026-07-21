document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Trigger immediately for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    
    // --- UI Elements ---
    
    // Generator
    const genForm = document.getElementById('generator-form');
    const genText = document.getElementById('barcode-text');
    const genType = document.getElementById('barcode-type');
    const genBtnClear = document.getElementById('btn-clear-gen');
    const genEmptyState = document.getElementById('gen-empty-state');
    const genResultState = document.getElementById('gen-result-state');
    const genLoader = document.getElementById('gen-loader');
    const genImg = document.getElementById('generated-barcode-img');
    const genValueDisplay = document.getElementById('gen-value');
    const genTypeDisplay = document.getElementById('gen-type');
    const btnDownloadPng = document.getElementById('btn-download-png');
    const btnDownloadSvg = document.getElementById('btn-download-svg');
    const btnPrint = document.getElementById('btn-print');
    
    // Scanner
    const scannerTabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');
    const uploadPreview = document.getElementById('upload-preview');
    const scanLoader = document.getElementById('scan-loader');
    const scanEmptyState = document.getElementById('scan-empty-state');
    const scanResultState = document.getElementById('scan-result-state');
    const scanValueDisplay = document.getElementById('scan-value');
    const scanTypeDisplay = document.getElementById('scan-type');
    const btnClearScan = document.getElementById('btn-clear-scan');
    
    // Camera
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('camera-canvas');
    const btnStartCamera = document.getElementById('btn-start-camera');
    const btnStopCamera = document.getElementById('btn-stop-camera');
    let stream = null;
    let cameraInterval = null;

    // --- State Variables ---
    let currentPngUrl = '';
    let currentSvgUrl = '';

    // --- Helper Functions ---
    
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
        toast.innerHTML = `${icon} <span>${message}</span>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    function copyToClipboard(textId) {
        const text = document.getElementById(textId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(err => {
            showToast('Failed to copy', 'error');
        });
    }

    // --- Generator Logic ---
    
    genForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text = genText.value.trim();
        const type = genType.value;
        
        if (!text) {
            showToast('Please enter barcode value', 'error');
            return;
        }
        
        genLoader.classList.remove('hidden');
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, type })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Update UI
                genImg.src = data.png_url;
                genValueDisplay.innerText = data.value;
                genTypeDisplay.innerText = data.type.toUpperCase();
                
                currentPngUrl = data.png_url;
                currentSvgUrl = data.svg_url;
                
                genEmptyState.classList.add('hidden');
                genResultState.classList.remove('hidden');
                
                showToast('Barcode generated successfully');
            } else {
                showToast(data.error || 'Failed to generate barcode', 'error');
            }
        } catch (error) {
            showToast('Server error occurred', 'error');
        } finally {
            genLoader.classList.add('hidden');
        }
    });
    
    genBtnClear.addEventListener('click', () => {
        genText.value = '';
        genResultState.classList.add('hidden');
        genEmptyState.classList.remove('hidden');
    });
    
    btnDownloadPng.addEventListener('click', () => {
        if (currentPngUrl) {
            const a = document.createElement('a');
            a.href = currentPngUrl;
            a.download = `barcode_${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
    
    btnDownloadSvg.addEventListener('click', () => {
        if (currentSvgUrl) {
            const a = document.createElement('a');
            a.href = currentSvgUrl;
            a.download = `barcode_${Date.now()}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
    
    btnPrint.addEventListener('click', () => {
        if (currentPngUrl) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head><title>Print Barcode</title></head>
                <body style="display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
                    <img src="${currentPngUrl}" style="max-width:100%;">
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    });
    
    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            copyToClipboard(this.getAttribute('data-target'));
        });
    });

    // --- Scanner Logic ---
    
    // Tabs
    scannerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class
            scannerTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class
            tab.classList.add('active');
            document.getElementById(`tab-${tab.getAttribute('data-tab')}`).classList.add('active');
            
            // Stop camera if switching away
            if (tab.getAttribute('data-tab') !== 'camera') {
                stopCamera();
            }
        });
    });
    
    // File Upload Drag & Drop
    uploadArea.addEventListener('click', () => imageUpload.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            imageUpload.files = e.dataTransfer.files;
            handleImageUpload(e.dataTransfer.files[0]);
        }
    });
    
    imageUpload.addEventListener('change', function() {
        if (this.files.length) {
            handleImageUpload(this.files[0]);
        }
    });
    
    function handleImageUpload(file) {
        if (!file.type.match('image.*')) {
            showToast('Please upload an image file', 'error');
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadPreview.src = e.target.result;
            uploadArea.classList.add('hidden');
            uploadPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
        
        // Send to server for scanning
        scanImage(file);
    }
    
    async function scanImage(fileBlob) {
        scanLoader.classList.remove('hidden');
        
        const formData = new FormData();
        formData.append('image', fileBlob, 'scan.jpg');
        
        try {
            const response = await fetch('/scan', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Play success sound if possible
                try {
                    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
                    audio.play().catch(e => {});
                } catch(e) {}
                
                displayScanResult(data.value, data.type);
                
                // If scanning from camera, stop the camera
                if (stream) {
                    stopCamera();
                }
            } else {
                showToast(data.error || 'No barcode found', 'error');
                resetScanUI();
            }
        } catch (error) {
            showToast('Error connecting to server', 'error');
            resetScanUI();
        } finally {
            scanLoader.classList.add('hidden');
        }
    }
    
    function displayScanResult(value, type) {
        scanValueDisplay.innerText = value;
        scanTypeDisplay.innerText = type || 'UNKNOWN';
        
        scanEmptyState.classList.add('hidden');
        scanResultState.classList.remove('hidden');
        
        showToast('Barcode scanned successfully!');
    }
    
    function resetScanUI() {
        // Reset upload UI
        uploadPreview.src = '';
        uploadPreview.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        imageUpload.value = '';
    }
    
    btnClearScan.addEventListener('click', () => {
        scanResultState.classList.add('hidden');
        scanEmptyState.classList.remove('hidden');
        resetScanUI();
    });
    
    // --- Camera Logic ---
    
    btnStartCamera.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            video.srcObject = stream;
            
            btnStartCamera.classList.add('hidden');
            btnStopCamera.classList.remove('hidden');
            
            // Start capturing frames
            scanEmptyState.classList.remove('hidden');
            scanResultState.classList.add('hidden');
            
            cameraInterval = setInterval(captureAndScanFrame, 1500); // Check every 1.5s
            
        } catch (err) {
            showToast('Camera access denied or unavailable', 'error');
            console.error(err);
        }
    });
    
    btnStopCamera.addEventListener('click', stopCamera);
    
    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            stream = null;
        }
        
        if (cameraInterval) {
            clearInterval(cameraInterval);
            cameraInterval = null;
        }
        
        btnStartCamera.classList.remove('hidden');
        btnStopCamera.classList.add('hidden');
    }
    
    function captureAndScanFrame() {
        if (!stream || video.videoWidth === 0) return;
        
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(blob => {
            if (blob) {
                // Send frame silently without loader overlay
                const formData = new FormData();
                formData.append('image', blob, 'frame.jpg');
                
                fetch('/scan', {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        displayScanResult(data.value, data.type);
                        stopCamera(); // Stop automatically on success
                    }
                })
                .catch(err => {
                    // Ignore errors silently for continuous scanning
                });
            }
        }, 'image/jpeg', 0.8);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
