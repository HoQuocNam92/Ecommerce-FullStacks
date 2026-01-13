import * as SettingService from './setting.services.js';

export const getAllSettings = async (req, res) => {
    try {
        const settings = await SettingService.getSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSetting = async (req, res) => {
    try {
        await SettingService.updateSetting(req.params.key, req.body.value);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
