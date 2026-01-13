import Setting from './setting.models.js';

export const getAllSettings = async () => Setting.findAll();
export const updateSettingByKey = async (key, value) => Setting.update({ value }, { where: { key } });
