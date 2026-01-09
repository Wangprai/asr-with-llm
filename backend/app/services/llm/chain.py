from langchain_core.prompts import PromptTemplate
from app.services.llm.model import get_gemini_llm
from app.services.llm.prompts import SUMMARY_PROMPT

def build_summary_chain():
    llm = get_gemini_llm()

    prompt = PromptTemplate(
        input_variables=["text"],
        template=SUMMARY_PROMPT
    )

    return prompt | llm   
