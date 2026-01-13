import imageCompression from 'browser-image-compression'
const compressImage = async (file) => {
    const options = {
        maxSizeMB: 0.3,
        useWebWorker: true
    }

    return await imageCompression(file, options);

}

export default compressImage