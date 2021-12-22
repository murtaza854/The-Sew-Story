export function CreateProductData(obj) {
    const details = {};
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
    const price = obj.prices.find(price => price.active === true);
    console.log(price);
    return {
        id: obj.id,
        name: obj.name,
        productCode: obj.productCode,
        category: obj.category.name,
        shortDescription: obj.shortDescription,
        active: obj.active,
        price: `$ ${price.amount}`,
        taxBehavior: price.taxBehavior === 'exclusive' ? 'Exclusive' : 'Inclusive',
        quantity: obj.quantity,
        story: obj.story,
        storyImagePath: obj.storyImagePath,
        details: details,
        images: obj.images,
        detailsKeys: Object.keys(details)
    };
}