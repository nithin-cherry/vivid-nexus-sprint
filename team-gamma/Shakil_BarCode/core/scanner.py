import cv2
import numpy as np
from pyzbar.pyzbar import decode

def scan_barcode(image_bytes):
    """
    Scan a barcode from image bytes in memory.
    
    Args:
        image_bytes (bytes): Raw byte array of the image.
        
    Returns:
        dict: Containing 'data' (str) and 'type' (str), or None if no barcode found.
    """
    try:
        # Decode the image directly from bytes using OpenCV
        np_arr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Failed to load image from byte stream. File may be corrupted or unsupported format.")
            
        # Decode the barcodes
        decoded_objects = decode(image)
        
        if not decoded_objects:
            return None
            
        # We'll just return the first barcode found for simplicity
        obj = decoded_objects[0]
        barcode_data = obj.data.decode('utf-8')
        barcode_type = obj.type
        
        return {
            'data': barcode_data,
            'type': barcode_type
        }
    except Exception as e:
        raise Exception(f"Error scanning barcode: {str(e)}")
