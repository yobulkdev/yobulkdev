from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.base import api_router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
