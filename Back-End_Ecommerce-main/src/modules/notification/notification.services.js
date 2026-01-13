import * as NotificationRepo from './notification.repositories.js';

export const getAllNotifications = () => NotificationRepo.getAllNotifications();
export const getNotificationsByUserId = (user_id) => NotificationRepo.getNotificationsByUserId(user_id);
export const markNotificationAsRead = (id) => NotificationRepo.markNotificationAsRead(id);
