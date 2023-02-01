from typing import Any, List
from fastapi import APIRouter
from app.lib.string_matcher import bert_tfidf_match

router = APIRouter()


@router.post("/string", status_code=200)
def match_list(lst1: List[str], lst2: List[str]) -> Any:
    # lst1 = ['EMP_NAME', 'EMP_AGE', 'EMP_DOJ', 'EMP_MAIL_ID']
    # lst2 = ['name', 'email', 'doj', 'age']
    results = bert_tfidf_match(lst1, lst2)
    return results
    