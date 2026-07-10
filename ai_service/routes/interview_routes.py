from fastapi import APIRouter

from services.interview_questions import generation, evaluation
from models.model import InterviewStartRequest

router = APIRouter()

@router.post('/question')
async def generateQuestion(data: InterviewStartRequest):
  resume = data.resume
  history = data.history
  response = await generation(resume, history)
  print("Response",response)
  return response


@router.post('/evaluate')
async def evaluateAnswer(data: InterviewStartRequest):
  resume = data.resume
  history = data.history
  response = await evaluation(resume,history)
  print("Response",response)
  return response