const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

//api/thoughts
router.route('/')
.get(getAllThoughts);


//api/thoughts/<thoughtId>
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)
.post(addThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)
.put(removeReaction);

module.exports = router;
