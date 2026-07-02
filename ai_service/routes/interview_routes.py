from fastapi import APIRouter
from services.interview_questions import generation, evaluation
from models.model import InterviewStartRequest
from rich import print
router = APIRouter()

@router.post('/question')
async def generateQuestion(data: InterviewStartRequest):
  resume = data.resume
  history = data.history
  response = await generation(resume, history)
  return response


@router.post('/evaluate')
async def evaluateAnswer(data: InterviewStartRequest):
  resume = data.resume
  history = data.history
  response = await evaluation(resume,history)
  return response