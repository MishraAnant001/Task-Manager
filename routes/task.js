import express from 'express' 
import {getAllTasks,postTask,getTaskById,patchTaskById,deleteTaskById} from '../Controllers/tasks.js';
const router = express.Router();

router.use(express.json())
router.route('/').get(getAllTasks).post(postTask);
router.route('/:id').get(getTaskById).patch(patchTaskById).delete(deleteTaskById);

export default router;