const Book = require("../models/book");

//GET: Search all books.
exports.findAll = async (req, res) => {
    try {
        const books = await Book.findAll({
            order: [["title", "ASC"]],
            raw: true,
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//GET: Search books by id receive.
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({
            where: { id }
        });

        if (!!book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//GET: Search books by code receive.
exports.findByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const book = await Book.findOne({
            where: { code }
        });

        if (!!book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//POST
exports.create = async (req, res) => {
    try {
        const newBook = await Book.create({
            internalCode: req.body.internalCode,
            isbn: req.body.isbn,
            title: req.body.title,
            subtitle: req.body.subtitle,
            volume: req.body.volume,
            edition: req.body.edition,
            language: req.body.language,
            synopsis: req.body.synopsis,
            originCountry: req.body.originCountry,
            author: req.body.author,
            authorLastName: req.body.authorLastName,
            publishingCompany: req.body.publishingCompany,
            publishDate: req.body.publishDate,
            pages: req.body.pages,
            bookImage: req.body.bookImage,
            bookSituation: req.body.bookSituation,
            genre: req.body.genre,
            collection: req.body.collection,
            ageGroup: req.body.ageGroup
        });
        res.json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//PUT
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const payload = {};

        if (!!req.body.internalCode) {
            payload.internalCode = req.body.internalCode;
        }
        if (!!req.body.isbn) {
            payload.isbn = req.body.isbn;
        }
        if (!!req.body.title) {
            payload.title = req.body.title;
        }
        if (!!req.body.subtitle) {
            payload.subtitle = req.body.subtitle;
        }
        if (!!req.body.genre) {
            payload.genre = req.body.genre;
        }
        if (!!req.body.volume) {
            payload.volume = req.body.volume;
        }
        if (!!req.body.edition) {
            payload.edition = req.body.edition;
        }
        if (!!req.body.language) {
            payload.language = req.body.language;
        }
        if (!!req.body.synopsis) {
            payload.synopsis = req.body.synopsis;
        }
        if (!!req.body.originCountry) {
            payload.originCountry = req.body.originCountry;
        }
        if (!!req.body.author) {
            payload.author = req.body.author;
        }
        if (!!req.body.authorLastName) {
            payload.authorLastName = req.body.authorLastName;
        }
        if (!!req.body.publishingCompany) {
            payload.publishingCompany = req.body.publishingCompany;
        }
        if (!!req.body.publishDate) {
            payload.publishDate = req.body.publishDate;
        }
        if (!!req.body.pages) {
            payload.pages = req.body.pages;
        }
        if (!!req.body.ageGroup) {
            payload.pages = req.body.ageGroup;
        }
        if (!!req.body.bookImage) {
            payload.bookImage = req.body.bookImage;
        }
        if (!!req.body.bookSituation) {
            payload.bookSituation = req.body.bookSituation;
        }
        if (!!req.body.genre) {
            payload.genre = req.body.genre;
        }
        if (!!req.body.collection) {
            payload.collection = req.body.collection;
        }
        if (!!req.body.ageGroup) {
            payload.ageGroup = req.body.ageGroup;
        }

        const updatedBook = await Book.update(payload, {
            where: { id },
        });

        res.json({ success: !!updatedBook && +updatedBook[0] > 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//DELETE
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.destroy({ where: { id } });

        res.json({ success: !!deletedBook });
    } catch (err) {
        res.status(500).json({ error: "Book not found." });
    }
}; 
