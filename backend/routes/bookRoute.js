import express from 'express';
const router =express.Router();
import { Book } from '../models/bookModel.js';

router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: "send all req fields: title, author, publishYear"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        };
        const book = await Book.create(newBook);
        return res.send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }

});

router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(
            {
                count: books.length,
                data: books
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: "send all req fields: title, author, publishYear"
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'Book data not found' })
        }
        return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.messgae)
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ message: "Book data not found" });
        }
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;