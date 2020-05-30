import { Dispatch, SetStateAction } from 'react';
import { StringSchema } from 'yup';

interface Field {
  value: string;
  error: string;
  schema: StringSchema<string>;
}

export default function yupValidateField(
  field: Field,
  setter: Dispatch<SetStateAction<Field>>,
): boolean {
  try {
    field.schema.validateSync(field.value);

    setter({ ...field, error: '' });
    return true;
  } catch (error) {
    setter({ ...field, error: error.errors[0] });
    return false;
  }
}
