const express = require('express');
const router = new express.Router();
const auth = require('../../middleware/auth');
const List = require('../../models/list');

router.get('/', auth, async (req, res) => {
  try {
    const { user } = req;
    await user.populate({
      path: 'lists'
    }).execPopulate()
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
    res.status(500).send('Internal Server Error. Please try again after some time')
  }
})

router.delete('/delete', auth, async (req, res) => {
  try {
    await List.findByIdAndDelete({ _id: req.body._id });
    return res.status(200).send();
  } catch (err) {
    res.status(500).send('Internal Server Error. Please try again after some time')
  }
})

router.put('/edit', auth, async (req, res) => {
  try {
    const existingList = await List.findById(req.body._id);
    existingList.name = req.body.name;
    await existingList.save();
    res.status(200).send(existingList);
  } catch (err) {
    res.status(500).send('Internal Server Error. Please try again after some time')
  }
})

module.exports = router;