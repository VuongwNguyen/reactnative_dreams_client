import {useFormik} from 'formik';

export const useFormikH = (initial, schema, onSubmit) => {
  const rules = schema();
  return useFormik({
    initialValues: initial,
    validationSchema: rules,
    onSubmit: onSubmit,
  });
};
