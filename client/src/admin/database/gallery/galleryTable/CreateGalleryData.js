export function CreateGalleryData(obj) {
    const data = {
        id: obj.id,
        fileName: obj.fileName,
        imagePath: obj.path,
    };
    return data;
}