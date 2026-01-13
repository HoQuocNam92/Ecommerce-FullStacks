export const success = (res, data, message = "Success") => {
    return res.json({ success: true, code: "OK", message, data });
}
export const error = (res, status, message, code = "FAILED") => {
    return res.status(status).json({ success: false, code, message });
} 