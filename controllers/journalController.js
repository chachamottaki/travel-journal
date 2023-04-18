const Journal = require('../models/journalModel');

exports.addTheme = async (req, res) => {
    try {
        const journal = await Journal.create(
            {
                journal_id: req.params.journal_id,
                theme_id: req.body.theme_id,
                user_id: req.body.user_id //temp until we introduce tokens
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

exports.updateTheme = async (req, res) => {
    
    const journal = await Journal.findByPk(req.params.journal_id);
    if (journal) {
      await journal.update(
        {
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