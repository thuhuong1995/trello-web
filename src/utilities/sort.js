<<<<<<< HEAD
export const mapOrder = (array, order, key) => {
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return array
}
=======
// Order an array of objects based on another array order

export const mapOrder = (array, order, key) => {
    array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return array
}
>>>>>>> da4980d1f8ac01473b2d9393e7b3cd83b435cd99
