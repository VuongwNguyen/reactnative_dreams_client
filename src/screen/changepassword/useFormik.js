const {useFormik} = require('formik');
import {ChangePasswordSchema} from '../../configs/validationschema/ChangePasswordSchema';

export default function useFormikHook(initialValues, onSubmit) {
  const validationschema = ChangePasswordSchema();
  return useFormik({
    initialValues,
    validationSchema: validationschema,
    onSubmit,
  });
}
