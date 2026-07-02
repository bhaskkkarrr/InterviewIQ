from fastapi import APIRouter, UploadFile, File
from services.resume_analyze import resume_info
from rich import print

router = APIRouter()

@router.post('/analyze')
async def analyze_resume(resume:UploadFile = File(...)):
  response = await resume_info(resume)
  return response