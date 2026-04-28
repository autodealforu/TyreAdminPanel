import moment from "moment";
const generateFields = ({ inputFields: inputFields, data: data }) => {
  if (data) {
    if (inputFields) {
      if (Object.keys(inputFields)) {
        const newDataCheck = {};
        Object.keys(inputFields).map((item, index) => {
          if (
            inputFields[item] &&
            inputFields[item].type === "string" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            if (inputFields[item].inputType === "datetime-local") {
              newDataCheck[item] = moment(data[item]).format(
                "yyyy-MM-DDThh:mm"
              );
            } else {
              if (inputFields[item].inputType === "date") {
                newDataCheck[item] = moment(data[item]).format("yyyy-MM-DD");
              } else {
                newDataCheck[item] = data[item];
              }
            }
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "text" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "checkbox" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "html" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "select" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "file" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "gallery" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "related" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item]
              ? !inputFields[item].static
                ? data[item]._id
                : data[item]
              : "";
          }
          if (
            inputFields[item] &&
            inputFields[item].type === "slug" &&
            !inputFields[item].hide
          ) {
            // console.log(item);
            newDataCheck[item] = data[item];
          }
          if (inputFields[item] && inputFields[item].type === "array") {
            newDataCheck[item] = data[item];
          }
        });
        // setCustomData(newDataCheck);
        return newDataCheck;
      }
    }
  }
};
export default generateFields;
