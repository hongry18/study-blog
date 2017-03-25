import express from 'express';
import comment from './comment';
 
const router = express.Router();
 
router.post('/', (req, res) => {
    res.json({ success: true });
});

router.put('/', (req, res) => {
    res.json({ success: true });
});

router.delete('/', (req, res) => {
    res.json({ success: true });
});

router.get('/:id', (req, res) => {
    res.json({ success: true });
});

router.get('/', (req, res) => {
    res.json({ success: true });
});

router.use('/:id/comment', comment);
 
export default router;
