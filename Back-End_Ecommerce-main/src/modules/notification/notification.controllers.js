import * as NotificationService from './notification.services.js';

export const getAllNotificationsByUser = async (req, res) => {
    try {
        const notifications = await NotificationService.getAllNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await NotificationService.getNotificationsByUserId(req.params.user_id);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        await NotificationService.markNotificationAsRead(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
