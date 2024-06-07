const db = require('../models/index');
const Journal = db.Journal;

exports.addJournal = async (req, res) => {
  try {
      const journal = await Journal.create({
          user_id: req.params.user_id,
          name: req.body.name,
          theme_id: req.body.theme_id
      });
      res.status(200).send(journal);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
};

exports.listJournalsByUser = async function (req, res) {
    try {
        const journals = await Journal.findAll({ where: { user_id: req.params.user_id } });
        if (journals.length > 0) {
            res.status(200).json(journals);
        } else {
            res.status(404).send({ message: 'No journals found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.addTheme = async (req, res) => {
    try {
        const journal = await Journal.create(
            {
                journal_id: req.params.journal_id,
                theme_id: req.body.theme_id
            }
        );
        res.status(200).send(journal);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

exports.getJournal = async (req, res) => {
    try {
      const journal = await Journal.findByPk(req.params.journal_id);
      if (journal) {
        res.send(journal);
      } else {
        res.status(404).send({ message: 'Journal not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

exports.updateJournal = async (req, res) => {
    
    const journal = await Journal.findByPk(req.params.journal_id);
    if (journal) {
      await journal.update(
        {
          name:req.body.name,
          theme_id: req.body.theme_id
        }
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
    } else {
      res.status(404).send({ message: 'Journal not found' });
    }
};