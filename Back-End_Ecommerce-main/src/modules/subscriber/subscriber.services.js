import * as SubscriberRepo from './subscriber.repositories.js';

export const getSubscribers = () => SubscriberRepo.getAllSubscribers();
export const createSubscriber = (data) => SubscriberRepo.createSubscriber(data);
export const deleteSubscriber = (id) => SubscriberRepo.deleteSubscriber(id);
