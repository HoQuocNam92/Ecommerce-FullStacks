import * as SettingRepo from './setting.repositories.js';

export const getSettings = () => SettingRepo.getAllSettings();
export const updateSetting = (key, value) => SettingRepo.updateSettingByKey(key, value);
