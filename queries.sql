CREATE TABLE book(
	id SERIAL PRIMARY KEY,
	title VARCHAR(150),
	author VARCHAR(100),
	rating VARCHAR(6) NOT NULL,
	cover_id BIGINT NOT NULL,
	date_added VARCHAR(15) NOT NULL,
	review TEXT NOT NULL
);

INSERT INTO book 
(id, title, rating, author, cover_id, date_added, review)
VALUES (1, 'The Lord of the Rings', '9/10', 'J.R.R. Tolkien', 14625765, '21-09-2024', 'This book is very engaging and good. I would recommend it to all the people who like fantasy stories.')

CREATE TABLE notes(
	id INTEGER REFERENCES book(id) ON DELETE CASCADE,
	book_notes TEXT
)

INSERT INTO notes (id, book_notes)
VALUES (1, 'In J.R.R. Tolkien''s epic tale, Frodo Baggins, a humble hobbit,
         inherits the One Ring, a powerful artifact that could enslave Middle-earth.

         With the help of his friends and allies, Frodo sets out on a perilous journey
         to destroy the Ring in the fires of Mount Doom.

         Along the way, they face dark forces, treachery, and the temptation of power.
         This story is about friendship, courage, and the battle between good and evil.')

/* for altering a constraint you have to remove the constraint first and then add again. Don"t do this unless required */
alter table notes
drop notes_id_fkey;

ALTER TABLE notes
ADD CONSTRAINT notes_id_fkey
FOREIGN KEY (id) REFERENCES book(id) ON DELETE CASCADE;
