const params = new URLSearchParams(window.location.search);

const paramsObj = Array.from(params.keys()).reduce(
  (acc, val) => ({ ...acc, [val]: params.get(val) }),
  {}
);
console.log("PARAM OBJECTS", paramsObj);
let newQParams = ``;
Object.keys(paramsObj) &&
  Object.keys(paramsObj).map((item, index) => {
    newQParams += `&exact[${item}]=${paramsObj[item]}`;
  });
console.log("NEW PARAMS", newQParams);
export default newQParams;
