# to run tests: docker-compose run --rm backend pytest -vv /app/tests
from httpx import AsyncClient
import pytest
from main import app

@pytest.mark.anyio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "BookWise is running!"}

@pytest.mark.anyio
async def test_check_db_connection():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/check-db")
    assert response.status_code == 200
    assert response.json() == {"message": "Database connection successful"}
