# to run tests: docker-compose run --rm backend pytest -vv /app/tests
from httpx import AsyncClient
import pytest
from main import app
import respx
from routers.library import GOOGLE_BOOKS_API_KEY
import actions
from models import SavedBooks
from httpx import Response

@pytest.mark.anyio
async def test_get_books_success():
    test_query = "The Hobbit"
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/books/", json={"query": test_query})
    assert response.status_code == 200
    assert "items" in response.json()

@pytest.mark.anyio
async def test_get_books_empty_query():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/books/", json={"query": ""})
    assert response.status_code == 400

@pytest.mark.anyio
async def test_get_books_with_mocked_api():
    test_query = "harry potter"
    mocked_response = {
        "items": [
            {
                "id": "_QYGrgEACAAJ",
                "volumeInfo": {
                    "title": "Harry Potter and the Order of the Phoenix",
                    "authors": ["J. K. Rowling"],
                },
            },
            {
                "id": "wrOQLV6xB-wC",
                "volumeInfo": {
                    "title": "Harry Potter and the Sorcerer's Stone",
                    "authors": ["J.K. Rowling"],
                },
            },
        ]
    }
    with respx.mock() as mock:
        mock.get(
            f"https://www.googleapis.com/books/v1/volumes?q={test_query}&key={GOOGLE_BOOKS_API_KEY}&maxResults=20"
        ).mock(return_value=Response(200, json=mocked_response))
        async with AsyncClient(app=app, base_url="http://test") as ac:
            response = await ac.post("/books/", json={"query": test_query})
    assert response.status_code == 200
    assert response.json() == mocked_response

@pytest.fixture(scope="module")
async def test_user_token():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword",
        }
        await ac.post("/register", json=user_data)
        login_data = {
            "username": user_data["username"],
            "password": user_data["password"],
        }
        response = await ac.post("/login", data=login_data)
        token = response.json()["access_token"]
        assert response.status_code == 200
        return f"Bearer {token}"


mock_book_data = {
    "book_title": "Example Book",
    "author": "Author Name",
    "book_id": "1",
    "descriptions": "Some description",
    "images": "http://example.com/image.png",
}

@pytest.mark.anyio
async def test_save_book_success(test_user_token):
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(
            "/save-book",
            json=mock_book_data,
            headers={"Authorization": test_user_token},
        )
    assert response.status_code == 200
