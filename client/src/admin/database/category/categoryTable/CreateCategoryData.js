export function CreateCategoryData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        fileName: obj.fileName,
        imagePath: obj.imagePath,
        comingSoon: obj.comingSoon,
        active: obj.active,
    };
    return data;
}