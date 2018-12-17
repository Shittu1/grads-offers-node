CREATE TABLE graduates (id SERIAL PRIMARY KEY, name TEXT);

CREATE TABLE offers (id SERIAL PRIMARY KEY, title TEXT, graduate_id INTEGER REFERENCES graduates (id) ON DELETE CASCADE);

INSERT INTO graduates (name) VALUES ('Elie'), ('Michael'), ('Matt'), ('Joel');

INSERT INTO offers (title, graduate_id) VALUES ('Teacher', 1), ('Super Teacher', 2), ('Mathematician', 3), ('Developer', 4), ('Super Doctor 1', 3), ('Super Doctor 2', 4), ('Super Developer 1', 2);
