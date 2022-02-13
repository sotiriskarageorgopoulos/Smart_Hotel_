const {
    getStorage,
    ref,
    uploadBytes
} = require("firebase/storage");

const storeImgToBucket = (image, id) => {
    const storage = getStorage();

    const storageRef = ref(storage, `${id}.png`);

    uploadBytes(storageRef, base64ToArrayBuffer(image), {
            contentType: 'image/png'
        })
        .then((s) => console.log("uploaded"))
}

const base64ToArrayBuffer = (image) => {
    const b = Buffer.from(image, 'base64');
    return b.buffer.slice(b.byteOffset, b.byteOffset + b.length);
}

module.exports = {
    storeImgToBucket
}