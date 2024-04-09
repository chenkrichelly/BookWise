<p>
  <img src="https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/BookWise/blob/main/frontend/public/favicon.ico" alt="Project Logo" width="70" height="70" /> <strong>BookWise</strong>
</p>



# BookWise

BookWise is a comprehensive book management system that provides users with the ability to explore, save, and manage their favorite books. Built using FastAPI for the backend, it offers a robust and efficient API for handling book data. Features include user authentication, book search, and user-specific booklists.

## Features

- **User Authentication:** Secure login and registration system to manage user sessions.
- **Book Search:** Leverage Google Books API to search for books by titles, authors, or ISBN.
- **Personal Booklist:** Allows users to save their favorite books and manage their personal booklist.

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Python 3.9 or newer

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/BookWise.git
   cd BookWise
   ```

2. **Build and run the Docker containers:**

   ```bash
   docker-compose up --build
   ```

   This command builds the application and starts the services defined in the `docker-compose.yml` file.

### Usage

Once the application is running, you can access the FastAPI documentation to test the endpoints at: `http://localhost:8000/docs`.

### Testing

Run the automated tests for the application using the following command:

```bash
docker-compose run --rm backend pytest
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Fork the project, create your feature branch, commit your changes, push to the branch, and open a pull request.

## Contact

- Project Link: [https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/BookWise](https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/BookWise)
