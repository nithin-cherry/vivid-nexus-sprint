import base64
import io
import barcode
from barcode.writer import ImageWriter, SVGWriter

def generate_barcode(text, barcode_type, format='png'):
    """
    Generate a barcode and return it as a base64 string.
    
    Args:
        text (str): The value to encode.
        barcode_type (str): The type of barcode (e.g., 'code128', 'ean13', 'code39').
        format (str): Output format ('png' or 'svg').
        
    Returns:
        str: Base64 encoded string of the generated barcode.
    """
    
    # Map requested types to python-barcode types if needed
    type_map = {
        'code128': 'code128',
        'ean13': 'ean13',
        'code39': 'code39'
    }
    
    bc_class_name = type_map.get(barcode_type, 'code128')
    
    try:
        barcode_class = barcode.get_barcode_class(bc_class_name)
    except barcode.errors.BarcodeNotFoundError:
        raise ValueError(f"Barcode type {barcode_type} is not supported.")
        
    writer = SVGWriter() if format == 'svg' else ImageWriter()
    
    try:
        bc_instance = barcode_class(text, writer=writer)
        
        # Write to in-memory buffer
        buffer = io.BytesIO()
        bc_instance.write(buffer)
        buffer.seek(0)
        
        # Encode as base64
        b64_string = base64.b64encode(buffer.read()).decode('utf-8')
        
        # Construct data URI
        mime_type = 'image/svg+xml' if format == 'svg' else 'image/png'
        return f"data:{mime_type};base64,{b64_string}"
        
    except Exception as e:
        raise Exception(f"Failed to generate barcode: {str(e)}")
