import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from inference_sdk import InferenceHTTPClient


app = FastAPI()

@app.post("/verify-diploma")
async def verify_diploma(file: UploadFile = File(...), subject: str = Form(...)):
    
    temp_file_path = f"temp_{file.filename}"
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer) 
        extracted_text = extract_text_ocr(temp_file_path)
        
        if not extracted_text:
            raise HTTPException(status_code=400, detail="Extract text failed")
        
        creds = check_creds(extracted_text, subject)
                
        return creds
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)      
            
def extract_text_ocr(file_path: str) -> str:
    # extract text from OCR result
    
    CLIENT = InferenceHTTPClient(
    api_url="https://infer.roboflow.com",
    api_key="FxtBI0qhFndscWa6fRHF"
    )

    result = CLIENT.ocr_image(inference_input=file_path)
        
    return result['result']

def check_creds(extracted_text: str, subject: str) -> str:
    if subject in extracted_text:
        return True
    else:
        return False
    

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)
    
    