const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Blog');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/blogs/getuser". Login required
router.get('/fetchallblogs', fetchuser, async (req, res) => {
    try {
        const blogs = await Note.find({ user: req.user.id });
        res.json(blogs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/blogs/addblog". Login required
router.post('/addblog', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, createdby } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const blog = new Note({
                title, description, createdby, user: req.user.id
            })
            const savedNote = await blog.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/blogs/updateblog". Login required
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, createdby } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (createdby) { newNote.createdby = createdby };

        // Find the blog to be updated and update it
        let blog = await Note.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        blog = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/blogs/deleteblog". Login required
router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Find the blog to be delete and delete it
        let blog = await Note.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", blog: blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router