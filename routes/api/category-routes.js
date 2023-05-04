const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories and include associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one category by id and include associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCategoryData = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
