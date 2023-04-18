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