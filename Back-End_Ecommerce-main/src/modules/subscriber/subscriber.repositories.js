import Subscriber from './subscriber.models.js';

export const getAllSubscribers = async () => Subscriber.findAll();
export const createSubscriber = async (data) => Subscriber.create(data);
export const deleteSubscriber = async (id) => Subscriber.destroy({ where: { id } });
