 # BookWise   <img src="https://github.com/EASS-HIT-PART-A-2024-CLASS-IV/BookWise/blob/main/frontend/public/favicon.ico" alt="Project Logo" width="50" height="50" />


BookWise is a comprehensive book management system that provides users with the ability to explore, save, and manage their favorite books. Built using FastAPI for the backend, it offers an efficient API for handling book data. With frontend using React and a Mysql databse, Features include user authentication, book search, and user-specific booklists.

## Features

- **User Authentication:** Secure login and registration system to manage user sessions.
- **Book Search:** Leverage Google Books API to search for books by titles, authors etc.
- **Personal Booklist:** Allows users to save their favorite books and manage their personal booklist.

## Getting Started

### Prerequisites

- Docker :whale2:
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

2. **Enjoy! :dizzy: :open_book:**

   The BookWise application is running and awaiting your use at: `http://localhost:3000`.

### Testing

Run the automated tests for the application using the following command:

```bash
docker-compose run --rm backend pytest
```

## Demo
Click the image to watch the project video demo:

[![Video Demo](frontend/src/images/Screenshot.png)](https://drive.google.com/file/d/1XBQS91OlSaluZQhlbI98PPIo7Q3YMAn1/view?usp=sharing)

## Contributing :computer:	

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Fork the project, create your feature branch, commit your changes, push to the branch, and open a pull request.
