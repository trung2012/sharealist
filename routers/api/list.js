const express = require('express');
const router = new express.Router();
const auth = require('../../middleware/auth');
const List = require('../../models/List');
const Item = require('../../models/Item');

router.get('/', auth, async (req, res) => {
  try {
    const { user } = req;
    await user.populate({
      path: 'lists',
      populate: {
        path: 'items',
        model: 'Item'
      }
    }).execPopulate();

    res.status(200).send(user.lists)
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/add', auth, async (req, res) => {
  try {
    const { user } = req;
    const newList = new List({
      name: req.body.name,
      owner: user._id
    })

    await newList.save();
    res.status(201).send(newList);

  } catch (err) {
    res.status(500).send('Something went wrong with our server. Please try again after some time')
  }
})

router.delete('/delete/:listId', auth, async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.listId.toString());
    return res.status(200).send(list);
  } catch (err) {
    res.status(500).send('Something went wrong with our server. Please try again after some time')
  }
})

router.put('/edit', auth, async (req, res) => {
  try {
    const existingList = await List.findById(req.body._id);
    existingList.name = req.body.name;
    await existingList.save();
    res.status(200).send(existingList);
  } catch (err) {
    res.status(500).send('Something went wrong with our server. Please try again after some time')
  }
})

router.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(500).send('Something went wrong with our server. Please try again after some time')
  }
})

router.get('/items', async (req, res) => {
  try {
    const list = await List.findById(req.query.list.toString());
    await list.populate('items').execPopulate();
    res.status(200).send({ listName: list.name, items: list.items });
  } catch (err) {
    res.status(500).send('Something went wrong with our server. Please try again after some time')
  }
})

module.exports = router;