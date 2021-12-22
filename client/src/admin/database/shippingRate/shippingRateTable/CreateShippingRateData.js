export function CreateShippingRateData(obj) {
    let deliveryEstimateMinUnit = '';
    let deliveryEstimateMaxUnit = '';
    if (obj.deliveryEstimateMinUnit === 'day') {
        deliveryEstimateMinUnit = 'Days';
    } else if (obj.deliveryEstimateMinUnit === 'hour') {
        deliveryEstimateMinUnit = 'Hours';
    } else if (obj.deliveryEstimateMinUnit === 'week') {
        deliveryEstimateMinUnit = 'Weeks';
    } else if (obj.deliveryEstimateMinUnit === 'month') {
        deliveryEstimateMinUnit = 'Months';
    } else if (obj.deliveryEstimateMinUnit === 'business_day') {
        deliveryEstimateMinUnit = 'Business Days';
    }
    if (obj.deliveryEstimateMaxUnit === 'day') {
        deliveryEstimateMaxUnit = 'Days';
    } else if (obj.deliveryEstimateMaxUnit === 'hour') {
        deliveryEstimateMaxUnit = 'Hours';
    } else if (obj.deliveryEstimateMaxUnit === 'week') {
        deliveryEstimateMaxUnit = 'Weeks';
    } else if (obj.deliveryEstimateMaxUnit === 'month') {
        deliveryEstimateMaxUnit = 'Months';
    } else if (obj.deliveryEstimateMaxUnit === 'business_day') {
        deliveryEstimateMaxUnit = 'Business Days';
    }
    const data = {
        id: obj.id,
        name: obj.name,
        fixedAmount: obj.fixedAmount,
        taxBehavior: obj.taxBehavior === 'exclusive' ? 'Exclusive' : 'Inclusive',
        deliveryEstimateMin: obj.deliveryEstimateMin + ' ' + deliveryEstimateMinUnit,
        deliveryEstimateMax: obj.deliveryEstimateMax + ' ' + deliveryEstimateMaxUnit,
        active: obj.active,
    };
    return data;
}