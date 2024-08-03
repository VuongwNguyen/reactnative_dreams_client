import {useFormik} from 'formik';

export default function  useFormik(initial, schema, onSubmit = () => {}) {
  const rules = schema();
  return useFormik({
    initialValues: initial,
    validationSchema: rules,
    onSubmit: onSubmit,
  });
}
