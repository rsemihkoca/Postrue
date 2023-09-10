from database import models
from database.db import engine
from database.crud import insertTransaction, calculate_data_for_today, calculate_data_for_week, calculate_data_for_month
from fastapi import FastAPI, Request, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.operator import calculatePosture, getTime
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
    try:
        # Check content type
        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
            raise HTTPException(status_code=400, detail="Uploaded file is not a image")

        bad_frames, img_base64, torso_inclination, neck_inclination, result = await calculatePosture(file)

        if bad_frames is None:
            raise HTTPException(status_code=400, detail="Invalid image")

        Datetime, Year, Month, Day = getTime()
        data = {}
        data["Datetime"] = Datetime
        data["Year"] = Year
        data["Month"] = Month
        data["Day"] = Day
        data["ClientId"] = 1
        data["ClientName"] = "admin"
        data["BadPosture"] = bad_frames > 0
        data["TorsoInclination"] = torso_inclination
        data["NeckInclination"] = neck_inclination
        data["Result"] = result
        data["Image"] = img_base64


    except Exception as e:
         raise e
    else:
        insertTransaction(data)

        # Return the result as a response
        response = {
            "bad_posture": bad_frames > 0,
            "image": img_base64
        }
        return response

@app.get("/daily/")
async def get_daily_stats():
    response = calculate_data_for_today()
    return response

@app.get("/weekly/")
async def get_weekly_stats():
    response = calculate_data_for_week()
    return response

# @app.get("/monthly/")
# async def transactions(interval: str):
#
#     interval
#     MTD : first week, second week ...
#     WTD
#     DTD
# Start the FastAPI app using Uvicorn if this script is the main module
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
{
    "Data": 
    {
        "Type": "Daily",
        "Average": 0.5, # Daily good posture average
        "Change": 0.2, # from last day average
        "TotalCount": 20,
        "NeckPercentage": 0.1, # Neck count / Total count
        "TorsoPercentage": 0.2, # Torso count / Total count
        "NeckTorsoPercentage": 0.7, # NeckTorso count / Total count
    
        "Intervals": 
        {
            "0-6": # from 0:00 to 6:00
            {
                "Count": 10, # Total count
                "Neck": 7, # Neck count
                "Torso": 2, # Torso count
                "NeckTorso": 1 # NeckTorso count
            },
            "6-12": # from 6:00 to 12:00
            {
                "Count": 3,
                "Neck": 2, 
                "Torso": 1,
                "NeckTorso": 0
            },
            "12-18": # from 12:00 to 18:00
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            },
            "18-24": # from 18:00 to 24:00
            {
                "Count": 2,
                "Neck": 1,
                "Torso": 1,
                "NeckTorso": 0
            }
        }
    }
}

{
    "Data": 
    {
        "Type": "Weekly",
        "Average": 0.5, # Weekly good posture average
        "Change": 0.2, # from last week
        "TotalCount": 200,
        "NeckPercentage": 0.1, # Neck count / Total count
        "TorsoPercentage": 0.2, # Torso count / Total count
        "NeckTorsoPercentage": 0.7, # NeckTorso count / Total count
    
        "Intervals": 
        {
            "Monday":
            {
                "Count": 10,
                "Neck": 7,
                "Torso": 2,
                "NeckTorso": 1
            },
            "Tuesday":
            {
                "Count": 3,
                "Neck": 2,
                "Torso": 1,
                "NeckTorso": 0
            },
            "Wednesday":
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            },
            "Thursday":
            {
                "Count": 2,
                "Neck": 1,
                "Torso": 1,
                "NeckTorso": 0
            },
            "Friday":
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            },
            "Saturday":
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            },
            "Sunday":
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            }
        }
    }
}


{
    "Data": 
    {
        "Type": "Monthly",
        "Average": 0.5, # Monthly good posture average
        "Change": 0.2, # from last month
        "TotalCount": 200,
        "NeckPercentage": 0.1, # Neck count / Total count
        "TorsoPercentage": 0.2, # Torso count / Total count
        "NeckTorsoPercentage": 0.7, # NeckTorso count / Total count
    
        "Intervals": 
        {
            "Week1":
            {
                "Count": 10,
                "Neck": 7,
                "Torso": 2,
                "NeckTorso": 1
            },
            "Week2":
            {
                "Count": 3,
                "Neck": 2,
                "Torso": 1,
                "NeckTorso": 0
            },
            "Week3":
            {
                "Count": 5,
                "Neck": 3,
                "Torso": 1,
                "NeckTorso": 1
            },
            "Week4":
            {
                "Count": 2,
                "Neck": 1,
                "Torso": 1,
                "NeckTorso": 0
            }
        }
    }
}



"""
