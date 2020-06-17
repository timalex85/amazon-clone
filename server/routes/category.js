const router = require('express').Router();
const Category = require('../models/category')

// Post request

router.post('/categories', async (req, res) => {
    try {
        const category = new Category();
        category.type = req.body.type;

        await category.save();
        
        res.json({
            success: true,
            message: 'Succesfully created new category'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Get request

router.get('/categories', async (req, res) => {
    try { 
        let categories = await Category.find();
        res.json({
            succes: true,
            categories: categories
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;