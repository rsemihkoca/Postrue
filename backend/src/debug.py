from database import models
from database.db import engine
from fastapi import FastAPI, Request, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.operator import calculatePosture
import time

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.post("/posture_detection/")
async def posture_detection(file: UploadFile = UploadFile(...)):
    # Read image from the request
    bad_frames, img_base64 = calculatePosture(file)

    if bad_frames is None:
        raise HTTPException(status_code=400, detail="Invalid image")

    # Return the result as a response
    response = {
        "bad_posture": bad_frames > 0,
        "image": img_base64
    }
    return response

@app.get("/transactions/")
async def transactions(interval: str):

    interval
    MTD
    WTD
    DTD



# Start the FastAPI app using Uvicorn if this script is the main module
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
