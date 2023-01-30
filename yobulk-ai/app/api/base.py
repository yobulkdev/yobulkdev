from fastapi import APIRouter
from app.api import matcher

api_router = APIRouter()
api_router.include_router(matcher.router, prefix="/matcher", tags=["matcher"])