export function CreateCityData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        state: obj.state.name,
        active: obj.active,
    };
    return data;
}