import * as Yup from 'yup';

const generateRequired = ({ inputFields: inputFields }) => {
  if (inputFields) {
    if (Object.keys(inputFields)) {
      const newRequiredCheck = {};
      Object.keys(inputFields).map((item, index) => {
        if (inputFields[item].required) {
          console.log(item);

          // Check if there's a specific validation type
          if (inputFields[item].validation === 'email') {
            newRequiredCheck[item] = Yup.string()
              .email('Invalid email address')
              .required('Required');
          } else if (inputFields[item].validation === 'phone') {
            newRequiredCheck[item] = Yup.string()
              .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
              .required('Required');
          } else {
            newRequiredCheck[item] = Yup.string().required('Required');
          }
        }
      });
      return newRequiredCheck;
    }
  }
};

export default generateRequired;
