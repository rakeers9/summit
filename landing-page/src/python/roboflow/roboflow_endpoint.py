from modal import Image, App, web_endpoint
from fastapi import FastAPI, HTTPException, File, UploadFile
from inference_sdk import InferenceHTTPClient
import base64

# Create base image with our dependencies
image = (
    Image.debian_slim()
    .apt_install(["libgl1-mesa-glx", "libglib2.0-0"])
    .pip_install([
        "fastapi[standard]",
        "inference",
        "opencv-python-headless",
        "python-multipart"
    ])
)

# Create a Modal app
app = App("roboflow-predict")

@app.function(image=image)
@web_endpoint(method="POST")
async def predict(image_data: UploadFile = File(...)):
    """
    Takes image file upload and returns Roboflow predictions
    """
    try:
        # Read the uploaded file
        contents = await image_data.read()
        print(f"Received image data of size: {len(contents)} bytes")
        print(f"File name: {image_data.filename}")
        
        # Convert to base64
        image_base64 = base64.b64encode(contents).decode('utf-8')
        print("Successfully converted image to base64")
        
        # Initialize Roboflow client
        client = InferenceHTTPClient(
            api_url="https://detect.roboflow.com",
            api_key="fx2H7rZgPM1rxInRNvt0"
        )
        
        print("Initialized Roboflow client, sending request")
        
        # Run prediction
        result = client.run_workflow(
            workspace_name="testing-y60jo",
            workflow_id="custom-workflow",
            images={
                "image": image_base64
            },
            use_cache=True
        )
        
        print("Received response from Roboflow")
        print(f"Raw response type: {type(result)}")
        print(f"Raw response: {result}")
        
        # Handle different response formats
        if isinstance(result, list):
            predictions = result
        else:
            # Extract predictions from dictionary response
            predictions = result.get('model_predictions', {}).get('predictions', [])
            
            # If no predictions found in expected location, try to get them directly
            if not predictions and isinstance(result, dict):
                predictions = result.get('predictions', [])
        
        print(f"Found {len(predictions)} predictions")
        
        return {
            "success": True,
            "predictions": predictions,
            "filename": image_data.filename
        }

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        print(f"Error type: {type(e)}")
        
        # Try to get more detailed error info if available
        error_details = getattr(e, 'detail', str(e))
        
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": str(error_details),
                "filename": getattr(image_data, 'filename', None)
            }
        )

if __name__ == "__main__":
    app.serve()