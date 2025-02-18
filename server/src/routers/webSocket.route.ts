import { Router } from 'express';
import { getWss } from '@/config/webSocket.config.js';

const router = Router();

router.get('/status', (req, res) => {
    const wss = getWss();
    return res.json({
        clients: wss.clients.size,
        status: 'active',
    });
});

router.post('/pushups/config', (req, res) => {
    return res.json({ message: 'Configuration updated' });
});

export default router;
