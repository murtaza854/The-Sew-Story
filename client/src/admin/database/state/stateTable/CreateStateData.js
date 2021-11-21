export function CreateStateData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        active: obj.active,
    };
    return data;
}