from fastapi import FastAPI, File, UploadFile
from routes.resume_routes import router as resume_router
from routes.interview_routes import router as interview_router
app = FastAPI()

app.include_router(
    resume_router,
    prefix='/resume',
    tags=["Resume"]
)
app.include_router(
  interview_router,
  prefix='/interview',
)