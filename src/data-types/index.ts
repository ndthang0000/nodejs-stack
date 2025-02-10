console.log(typeof null) // object -> convert to number 0
console.log(typeof undefined) // object
console.log(undefined == null) // true
console.log(undefined == false) // true
const a = null
if (!a) {
    console.log('a is falsy')
}
console.log(Boolean(null)) // false
console.log(Boolean(undefined)) // false
