// importing user model
const { User } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
         .populate({
             path: 'thoughts',
             select: '-__v'
         })
         .select('-__v')
         .sort({_id: -1 })
         .then(dbUserData => res.json(dbUserData))
         .catch( err => {
             console.log(err);
             res.status(400).json(err);
         });
    },
    //find one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
         .populate({
            path: 'thoughts',
            select: '-__v'
         })
         .select('-__v')
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!'});
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => {
             console.log(err);
             res.status(400).json(err);
         });
    },
    //create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update a user by id
    updateUser({ params, body }, res) {
        //runValidators: true tells mongoos to use the validaor settings or users will be able to update non valid emails latter. 
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(400).json({ message: "No user with this id!"});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete pizza
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

} 
module.exports = userController;