import Notification from './notification.models.js';

export const getAllNotifications = async () => Notification.findAll();
export const getNotificationsByUserId = async (user_id) => Notification.findAll({ where: { user_id } });
export const markNotificationAsRead = async (id) => Notification.update({ is_read: true }, { where: { id } });
