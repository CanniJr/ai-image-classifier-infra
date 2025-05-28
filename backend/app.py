from fastapi import FastAPI, uploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from model import predict
import shutil 

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.post("/predict")
async def classify_image(file: uploadFile = File(...)):
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    prediction = predict(file.filename)
    # Return the prediction result
    return {"prediction": prediction}