from app.services.llm.chain import build_summary_chain
from app.services.llm.text_splitter import split_text
from app.services.llm.postprocess import clean_summary

async def hierarchical_summary(transcript: str):
    chunks = split_text(transcript)

    summary_chain = build_summary_chain()

    # 1) sub summaries 
    partial_summaries = []
    for chunk in chunks:
        result = await summary_chain.ainvoke({"text": chunk})
        text = result.content if hasattr(result, "content") else result
        partial_summaries.append(clean_summary(text))

    # 2) combine sub summaries
    combined_text = "\n".join(partial_summaries)

    # 3) final summary
    final_result = await summary_chain.ainvoke({
        "text": combined_text
    })

    final_summary = (
        final_result.content
        if hasattr(final_result, "content")
        else final_result
    )

    return {
        "method": "hierarchical",
        "chunks": len(chunks),
        "partial_summaries": partial_summaries,
        "final_summary": clean_summary(final_summary)
    }
