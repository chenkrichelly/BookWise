# to run tests: docker-compose run --rm backend pytest -vv /app/tests
from httpx import AsyncClient
import pytest
from main import app

test_user_token ="";

@pytest.mark.anyio
async def register_user():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        user_data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "testpassword123",
        }
        response = await ac.post("/register", json=user_data)
        test_user_token = response;


@pytest.mark.anyio
async def test_register_with_existing_username():
    existing_user = {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "testpassword123",
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/register", json=existing_user)
        assert response.status_code == 400
        assert response.json()["detail"] == "Username already registered"

@pytest.mark.anyio
async def test_login_success():
    user_credentials = {
        "username": "testuser",
        "password": "testpassword",
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/login", data=user_credentials)
        assert response.status_code == 200
        assert "access_token" in response.json()
        assert response.json()["token_type"] == "bearer"

@pytest.mark.anyio
async def test_login_invalid_credentials():
    invalid_credentials = {
        "username": "wronguser",
        "password": "wrongpassword",
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/login", data=invalid_credentials)
        assert response.status_code == 401
        assert response.json()["detail"] == "Incorrect username or password"

@pytest.mark.anyio
async def test_list_users(test_user_token):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        headers = {"Authorization": test_user_token}
        response = await ac.get("/list-users", headers=headers)
        assert response.status_code == 200
