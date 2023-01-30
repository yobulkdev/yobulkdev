from typing import Any, List
from fastapi import APIRouter
# from app.lib.string_matcher import similarity_score

router = APIRouter()


@router.post("/string", status_code=201)
def match_string(text1: List[str], text2: List[str]) -> Any:
    # score = similarity_score(text1, text2)
    return {"score": 100}
    