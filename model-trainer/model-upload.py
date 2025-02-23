import modal
import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import tempfile
from fastapi.responses import FileResponse

# NEEDS TO BE A TORCHSCRIPT MODEL

MODEL_DIR = "uploaded_models"
os.makedirs(MODEL_DIR, exist_ok=True)

app = FastAPI()

stub = modal.Stub("model_validation_stub")

@stub.function(
    image=modal.Image.debian_slim().pip_install(["torch", "torchvision", "fastapi", "uvicorn", "python-multipart", "inference_sdk"])
)
def validate_model(model_bytes: bytes, filename: str) -> str:
    import torch
    from fastapi import FastAPI, File, UploadFile, HTTPException, Form
    import tempfile
    import os
    
    try:
        temp_model_path = os.path.join(tempfile.gettempdir(), filename)
        with open(temp_model_path, "wb") as f:
            f.write(model_bytes)
    
        model = torch.jit.load(temp_model_path, map_location="cpu")
        model.eval()
        return True
    except Exception as e:
        return False
    

@app.post("/upload-model")
async def upload_model(model_file: UploadFile = File(...)):
    temp_dir = tempfile.mkdtemp()
    # model_path = os.path.join(temp_dir, model_file.filename)

    try:
        model_bytes = await model_file.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")
    
    try:    
        with stub.run():
            validation_result = validate_model.remote(model_bytes, model_file.filename)
            is_valid = validation_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in Modal call: {str(e)}")
    
    if not is_valid:
        raise HTTPException(status_code=400, detail="Uploaded model is invalid or unusable.")

    persistent_path = os.path.join(MODEL_DIR, model_file.filename)
    try:
        with open(persistent_path, "wb") as f:
            f.write(model_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving model: {str(e)}")
        
    download_url = f"http://127.0.0.1:8000/download-model/{model_file.filename}"
    return {"message": "Model uploaded, validated, and saved.", "download_url": download_url}

@app.get("/download-model/{filename}")
async def download_model(filename: str):
    file_path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Model not found.")
    return FileResponse(file_path, media_type="application/octet-stream", filename=filename)


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)
        
        
        
# def run_inference(image_path: str, model_path:str) -> dict:
#     import torch
#     from torchvision import transforms
#     from PIL import Image
#     import json
    
#     model = torch.load(model_path)
#     model.eval()
    
#     img = Image.open(image_path).convert('RGB')
#     transform = transforms.Compose([
#         transforms.Resize(224, 224)),   
#         transforms.ToTensor(),    
#     ])
    
#     input_tensor = transform(img).unsqueeze(0)
#     with torch.no_grad():
#         outputs = model(input_tensor)
        
#     return {"output": outputs.tolist()}

# if __name__ == "__main__":
#     stub.run():
#         result = run_inference.call("path/to/image")