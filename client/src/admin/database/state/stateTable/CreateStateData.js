export function CreateStateData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        code: obj.abbreviation,
        active: obj.active,
    };
    return data;
}