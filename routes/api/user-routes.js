const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//set up Get and Post at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

//set up GET one, PUT, and Delete at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  module.exports = router;