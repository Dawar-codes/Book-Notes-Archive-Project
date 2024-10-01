import express from "express";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Ensure SSL is configured
  },
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME, // Use the name of your database here
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT || 5432, // Use 5432 as a default if not set
});

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let books = [];

async function getBook() {

  try {
    const result = await db.query("SELECT * FROM book WhERE true ORDER BY id DESC");
    books = result.rows;
    console.log(books);
    return books;

  } catch (error) {

    console.error("Error fetching books:", error);
    return [];
  }
};


async function getBooksByTitle(title) {
  try {
    const result = await db.query("SELECT * FROM book WHERE title ILIKE '%' || $1 || '%';", [title]);
    return result.rows; // Return the filtered books
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return an empty array in case of an error
  }
}



app.get("/", async (req, res) => {
  const books = await getBook();
  res.render("index.ejs", { books: books });
});


app.post("/searchList", async (req, res) => {
  const searchTerm = req.body.getBookName;
  const getbooks = await getBook();
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}&limit=10`);
    const books = response.data.docs;
    res.render("index.ejs", { searchedBook: books, books: getbooks, searchTerm: searchTerm });
  } catch (error) {
    console.error(error);
    res.render("index.ejs", { books: [], searchTerm: searchTerm });
  }
});



app.get("/searchInside", async (req, res) => {
  const title = req.query.title;
  try {
      const books = await getBooksByTitle(title);
  res.render("index.ejs", { books });
  } catch (error) {
    console.log(error)
  }
  
});



app.get("/addBook", (req, res) => {
  const title = req.query.title;
  const cover = req.query.cover
  const author = req.query.author;

  res.render("addBook.ejs", { title: title, cover: cover, author: author });
});

app.post("/addBook", async (req, res) => {
  const { title, author, rating, cover, date, review } = req.body;
  try {
    const result = await db.query("INSERT INTO book (title, author, rating, cover_id, date_added, review) VALUES ($1,$2,$3,$4,$5,$6)", [title, author, rating, cover, date, review]);

  } catch (error) {
    console.log(error);
  }


  res.redirect("/");

});


app.get("/notes/:id", async (req, res) => {

  console.log("Params received:", req.params);
  const id = parseInt(req.params.id);
  console.log("ID received:", id);

  try {
    const result = await db.query(`
    SELECT book.*, notes.book_notes 
    FROM book 
    LEFT JOIN notes ON book.id = notes.id 
    WHERE book.id = $1`,
      [id]
    );
    if (result.rows.length > 0) {
      const book = result.rows[0]; // Fetch the first (and only) book
      res.render("notes.ejs", { book: book });
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.log(error);
  }
});


app.post("/edit", async (req, res) => {
  const notes = req.body.updatedNotes;
  const id = req.body.id;

  console.log("Updated Notes:", notes);
  console.log("ID:", id);

  try {
    const noteCheck = await db.query("SELECT * FROM notes WHERE id = $1", [id]);

    if (noteCheck.rows.length === 0) {
      // If no note exists, insert a new note
      await db.query("INSERT INTO notes (id, book_notes) VALUES ($1, $2)", [id, notes]);
    } else {
      // If a note exists, update it
      await db.query("UPDATE notes SET book_notes = $1 WHERE id = $2", [notes, id]);
    }


    const result = await db.query("SELECT * FROM book JOIN notes USING (id) WHERE id =$1", [id]);
    if (result.rows.length > 0) {
      const book = result.rows[0];

      res.render("notes.ejs", { book: book });
    } else {
      res.status(404).send("Book not found");
    }

  } catch (error) {
    console.log(err);
  }

});

app.post("/delete/book/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM book WHERE id=$1", [id]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

