const {useFormik} = require('formik');
import {ChangeNewPasswordSchema} from '../../configs/validateSchema/ChangeNewPasswordSchema';

export default function useFormikHook(initialValues, onSubmit) {
  const validationSchema = ChangeNewPasswordSchema();
  return useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
}
