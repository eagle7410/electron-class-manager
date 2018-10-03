/**
 * Clear repeat values
 * @param {Array} arr
 */
const unique = (arr) => (Array.isArray(arr) ? arr : []).filter((value, index, self) => self.indexOf(value) === index);

/**
 * Return different part of the array
 *
 * @param	{Array} arr1
 * @param	{Array} arr2
 *
 * @return {Array}
 */
const diff =  (arr1, arr2) => (arr1 || []).filter((item) => !(arr2 || []).includes(item) ) ;


/**
 * Sum of array elements
 * @return {Number}
 */
const sum = (a) =>
	(Array.isArray(a))
		? a.reduce( (pv, cv) => (isNaN(pv) ? 0 : Number(pv)) + (isNaN(cv) ? 0 : Number(cv)), 0)
		: 0;

export {
	unique,
	diff,
	sum
};
