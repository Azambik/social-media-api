const { User } = require('../models');

const friendController = {
    // add thought to user
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: body.friendId } }, 
            { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    removeFriend({ params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { _id : body.friendId } } },
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = friendController;