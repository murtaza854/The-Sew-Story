export function CreateCouponData(obj) {
    // parse the coupon date
    const redeemBy = new Date(obj.redeemBy);
    let redeemByString = redeemBy.getFullYear() + "-" + (redeemBy.getMonth() + 1) + "-" + redeemBy.getDate();
    return {
        id: obj.id,
        name: obj.name,
        type: obj.type,
        appliedToProducts: obj.appliedToProducts,
        value: obj.type === 'Percentage Discount' ? `${parseFloat(obj.percentOff)} %` : `$ ${parseInt(obj.amountOff)}`,
        usageLimit: obj.maxRedemptions,
        redeemBy: obj.redeemBy? redeemByString : null,
        promotionCodes: obj.hasPromotionCodes,
    };
}