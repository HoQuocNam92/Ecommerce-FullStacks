import * as SubscriberService from './subscriber.services.js';

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await SubscriberService.getSubscribers();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addSubscriber = async (req, res) => {
    try {
        const subscriber = await SubscriberService.addSubscriber(req.body);
        res.status(201).json(subscriber);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
