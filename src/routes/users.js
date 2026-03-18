const express = require('express');
const router  = express.Router();
const {
  getUsers, getArchivedUsers, getUserById,
  createUser, updateUser, deleteUser,
  archiveUser, restoreUser, checkEmailCtrl, getStats,
} = require('../controllers/userController');

router.get('/stats',        getStats);
router.get('/archived',     getArchivedUsers);
router.get('/check-email',  checkEmailCtrl);
router.get('/',             getUsers);
router.get('/:id',          getUserById);
router.post('/',            createUser);
router.put('/:id',          updateUser);
router.delete('/:id',       deleteUser);
router.patch('/:id/archive', archiveUser);
router.patch('/:id/restore', restoreUser);

module.exports = router;
