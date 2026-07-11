from dotenv import load_dotenv
load_dotenv()
from fastapi import HTTPException
from langchain_core.exceptions import OutputParserException
from langchain_mistralai import ChatMistralAI
# from langchain_openrouter import ChatOpenRouter
from models.model import ResumeSummary, ResumeAnalysisResponse
from services.resume import load_document
# from langchain_ollama import ChatOllama

# llm_temp = ChatOllama(
#   model="qwen2.5:3b",
#   temperature=0.5,
#   max_token = 300
# ).with_structured_output(ResumeSummary)

# model = ChatOpenRouter(
#   model='openai/gpt-4o-mini',
#   max_tokens=300
# ).with_structured_output(ResumeSummary)

mistral_llm = ChatMistralAI(
    model="mistral-small-2506",
    max_tokens=1000,
    temperature=0
).with_structured_output(ResumeSummary)

async def resume_info(resume):
  resume_text = await load_document(resume)
  try:
    analysis_result = await mistral_llm.ainvoke(resume_text)
    return ResumeAnalysisResponse(
      resume_text=resume_text,
      analysis_result=analysis_result
    )
  except OutputParserException as error:
        print(f"Structured output parsing failed: {error}")

        raise HTTPException(
            status_code=502,
            detail="AI generated an incomplete resume analysis. Please try again."
        )

  except Exception as error:
        print(f"Resume analysis failed: {type(error).__name__}: {error}")

        raise HTTPException(
            status_code=500,
            detail="Failed to analyze the resume."
        )