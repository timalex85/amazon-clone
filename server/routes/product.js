const router = require('express').Router();
const Product = require('../models/product')

const upload = require('../middlewares/upload-photo')

// Post request - create a new product

router.post('/products', upload.single('photo'), async (req, res) => {
   try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
        status: true,
        message: "Succesfully saved"
    })
   } catch (err) {
    res.status(500).json({
        success: false,
        message: err.message
    })
   }
})

// Get request - get all products

router.get('/products', async (req, res) => {
    try {
        let products = await Product.find();

        res.json({
            success: true,
            products: products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Get request - get a single product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id});

        res.json({
            success: true,
            products: product
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// Put request - update a single product

router.put('/products/:id', upload.single('photo'), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id }, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.location,
                description: req.body.description,
                owner: req.body.ownerID,
            }
        },
        { upsert: true // Creates object if it doesn't already existin the database
        });

        res.json({
            success: true,
            updatedProduct: product
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
// Delete request - delete a single product

router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({
            _id: req.params.id
        })
    
    if (deletedProduct) {
        res.json({
            success: true,
            message: 'Succesfully deleted'
        })
    }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;