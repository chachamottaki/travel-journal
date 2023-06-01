
const db = require('../models/index');
const Entry = db.Entry;

exports.addEntry = async (req, res) => {
    try {
        const entry = await Entry.create(
            {
                entry_id: req.body.entry_id, 
                date: req.body.date, 
                location: req.body.location
            }
        );
        res.status(200).send(entry);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.listEntryByDate = async function (req, res) {
    await Entry.findAll({where:{ journal_id: req.params.journal_id, date: req.params.date_id} })
        .then(data => {
            console.log("All entries from this date:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.listEntryByLocation = async function (req, res) {
    await Entry.findAll({where:{ journal_id: req.params.journal_id, location: req.params.location_id} })
        .then(data => {
            console.log("All entries from this date:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.updateEntry = async (req, res) => {
    
    const entry = await Entry.findByPk(req.params.entry_id);
    if (entry) {
      await entry.update(
        {
          date: req.body.date,
          location: req.body.location
        }
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
    } else {
      res.status(404).send({ message: 'Entry not found' });
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
