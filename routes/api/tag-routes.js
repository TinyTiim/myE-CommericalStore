const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTagData = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
