import cloudinary
import cloudinary.uploader

def upload_cloudinary(image_file):
    result = cloudinary.uploader.upload(
            image_file,
            folder="snack_images"
        )
    image_url = result['secure_url']
    
    return image_url