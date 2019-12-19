export default function Utils() {
  function isEqual(array1, array2) {
    let result = true;

    if (
      (array1 == undefined && array2 != undefined) ||
      (array1 != undefined && array2 == undefined)
    )
      return false;

    if (array1.length !== array2.length) return false;

    array1.forEach((each, index) => {
      if (
        each.value !== array2[index].value ||
        each.label !== array2[index].label ||
        each.selected !== array2[index].selected
      )
        result = false;
    });

    return result;
  }

  return Object.freeze({
    isEqual
  });
}
