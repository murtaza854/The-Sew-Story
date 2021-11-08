export function findCommonElements2(arr1, arr2) {

    // Create an empty object
    let obj = {};

    // Loop through the first array
    for (let i = 0; i < arr1.length; i++) {

        // Check if element from first array
        // already exist in object or not
        if (!obj[arr1[i]]) {

            // If it doesn't exist assign the
            // properties equals to the
            // elements in the array
            const element = arr1[i];
            obj[element] = true;
        }
    }

    // Loop through the second array
    for (let j = 0; j < arr2.length; j++) {

        // Check elements from second array exist
        // in the created object or not
        if (obj[arr2[j]]) {
            return true;
        }
    }
    return false;
}