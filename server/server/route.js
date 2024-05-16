import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser ,loginUser,updateWishlistByUsername,stockSearch} from '../controller/user-controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/update', updateWishlistByUsername);
router.post('/stocksearch',stockSearch)


export default router;