import {useFormik} from 'formik';
import {registerSchema} from '../configs/validateSchema/registerSchema';

export const useFormikHook = (initialValues, onSubmit) => {
  const validationSchema = registerSchema();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return formik;
};
