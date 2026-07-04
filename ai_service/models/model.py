from pydantic import BaseModel, Field
from typing import Optional

class InterviewQuestion(BaseModel):
    topic: str = Field(description="Give topic of the question that has been asked from the AI to tell the context of the question to the user, it should be precise and accurate, it should not be resume. It should be the topic of the question, 'Resume' should not be the topic")
    difficulty: str = Field(description="It should be easy, medium, and hard only nothing else")
    question: str

class AnswerEvaluation(BaseModel):
    score: int = Field(description="Score between 0 to 10 based on the response")                  
    feedback: str
    strengths: list[str] = Field(
        description="List of strengths in the candidate's answer"
    )
    weaknesses: list[str] = Field(
        description="List of weaknesses in the candidate's answer"
    )
    confidence: int = Field(description="Score between 1 to 10 based on the response")  
    correctness:int = Field(description="Score between 1 to 10 based on the response")  
    communication: int = Field(description="Score between 1 to 10 based on the response")  

class ResumeSummary(BaseModel):
    experience: str = Field(
        description=(
            "The candidate's full-time professional industry work experience. "
            "Return values like 'Fresher', '1 year', '2 years', '5+ years'. "
            "Only count full-time industry experience. "
            "Do NOT count internships, freelance work, personal projects, college projects "
            "research work, hackathons, or training programs as industry experience. "
            "If the resume does not mention any full-time industry experience, return exactly 'Fresher'."
        )
    )

    projects: list[str] = Field(
        description="List of the candidate's major projects."
    )

    skills: list[str] = Field(
        description="List of the candidate's technical skills."
    )

    candidate_name: str
    role:str = Field(description="The role for which the candidate is capable of according to their resume")
    education: list[str]
    other_details: list[str] =Field(description="Some other important and key details about the candidate that can help in interview according to their resume")

class ResumeAnalysisResponse(BaseModel):
    resume_text : str
    analysis_result: ResumeSummary

class History(BaseModel):
    question: str
    difficulty: str
    answered: Optional[bool]
    answer: Optional[str]= None
    feedback: Optional[str]= None
    score: int
    confidence: int
    correctness: int
    topic: str
    communication: int    
    strengths: Optional[list[str]]= None
    weaknesses: Optional[list[str]]= None

class InterviewStartRequest(BaseModel):
    resume:str
    history: list[History]

