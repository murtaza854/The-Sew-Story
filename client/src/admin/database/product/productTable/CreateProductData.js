export function CreateProductData(id, firstName, lastName, email, admin, emailVerified) {
    const name = firstName + ' ' + lastName;
    return {
        id,
        name,
        email,
        admin,
        emailVerified,
    };
}