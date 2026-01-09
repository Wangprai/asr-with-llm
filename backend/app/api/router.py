from fastapi import APIRouter
from app.api.v1.endpoints import asr, pipeline

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(asr.router)
api_router.include_router(pipeline.router)