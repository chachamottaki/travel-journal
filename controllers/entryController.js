const Entry = require('../models/entryModel');

exports.addEntry = async (req, res) => {
    try {
        const entry = await Entry.create(
            {
                entry_id: req.body.entry_id, 
                date: req.body.date, 
                location: req.body.location, 
                journal_id: req.params.journal_id
            }
        );
        res.status(200).send(entry);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.deleteEntry = async (req, res) => {
    const entry = await Entry.findByPk(req.params.entry_id);
    if (entry) {
      entry.destroy()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
    } else {
      res.status(404).send({ message: 'Entry not found' });
    }
  }
