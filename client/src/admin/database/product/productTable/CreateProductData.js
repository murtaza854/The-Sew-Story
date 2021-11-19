export function CreateProductData(obj) {
    const details = {};
    // console.log(obj);
    obj.details.forEach(detail => {
        if (details[detail.type.name] === undefined) {
            details[detail.type.name] = [];
        }
        if (detail.type.name in details) {
            details[detail.type.name].push({
                label: detail.label,
                text: detail.text
            });
        }
    });
    // console.log(details);
    // console.log(Object.keys(details));
    return {
        id: obj.id,
        name: obj.name,
        productCode: obj.productCode,
        category: obj.category.name,
        active: obj.active,
        price: obj.price,
        quantity: obj.quantity,
        story: obj.story,
        storyImagePath: obj.storyImagePath,
        details: details,
        images: obj.images,
        detailsKeys: Object.keys(details)
    };
}