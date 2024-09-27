
# Book Notes Archive

This is a web application to keep track of books you have read, including titles, authors, reading dates, ratings, and personal notes.

## Features
- Add books with title, author, rating, and personal notes.
- Search books by title.
- Edit or delete book entries.
- Fetch book cover images automatically from OpenLibrary API.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: EJS (Embedded JavaScript Templates), CSS
- **API Integration**: OpenLibrary API for fetching book cover images

## Setup

To run this project on your local machine, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-notes-archive.git
```

2. Navigate to the project directory:

```bash
cd book-notes-archive
```

3. Install the required dependencies:

```bash
npm install
```

4. Set up the database:

- Create a PostgreSQL database.
- Update the `.env` file with your database credentials (create a new `.env` file if one does not exist).
  
Example `.env` file:

```
DB_USER=your_db_user
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=5432
PORT=3000
```

5. Run the database migrations to set up the required tables:

```bash
psql -U your_db_user -d your_database -f schema.sql
```
If that does'nt work, open the queries.sql file and run those queries in Postgres. and then move forward to the next step below.

6. Start the application:

```bash
npm start
```

7. Open your browser and go to:

```
http://localhost:3000
```

## Usage

- To add a book, click on the "Add Book" button and fill out the form.
- To edit or delete a book, use the buttons next to each book in the list.
- You can search for books by entering the title in the search bar.

## API

The application integrates with the [OpenLibrary API](https://openlibrary.org/developers/api) to fetch book cover images based on the book title and author.

## License

This project is licensed under the MIT License.
