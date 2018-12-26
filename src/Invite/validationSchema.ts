import { mixed, object } from 'yup';

const getValidationSchema = () => {
  return object().shape({
    file: mixed()
      .required('A file is required')
      .test(
        'fileFormat',
        'CSV only',
        (value) => value && value.type === 'text/csv'
      ),
  });
};

export { getValidationSchema };
