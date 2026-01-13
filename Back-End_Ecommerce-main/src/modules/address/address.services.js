import * as AddressRepo from './address.repositories.js';

export const getAddress = (id) => AddressRepo.getAddress(id);
export const addAddress = (data) => AddressRepo.addAddress(data)
export const deleteAddress = (user_id, id) => AddressRepo.deleteAddress(user_id, id)
export const updateAddress = (user_id, data) => AddressRepo.update_Address(user_id, data)

