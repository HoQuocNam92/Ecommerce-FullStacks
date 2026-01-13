import * as TeleService from './telegram.service.js'
export const handleMessage = async (req, res, next) => {
    try {
        await TeleService.handleMessage(req.body)
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}