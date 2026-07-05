from dotenv import load_dotenv
load_dotenv()

from langchain_mistralai import ChatMistralAI
from langchain_openrouter import ChatOpenRouter
from models.model import ResumeSummary, ResumeAnalysisResponse
from services.resume import load_document
from langchain_ollama import ChatOllama

llm_temp = ChatOllama(
  model="qwen2.5:3b",
  temperature=0.5,
  max_token = 300
).with_structured_output(ResumeSummary)

model = ChatOpenRouter(
  model='openai/gpt-4o-mini',
  max_tokens=300
).with_structured_output(ResumeSummary)

async def resume_info(resume):
  resume_text = await load_document(resume)
  analysis_result = await llm_temp.ainvoke(resume_text)
  return ResumeAnalysisResponse(
    resume_text=resume_text,
    analysis_result=analysis_result
  )