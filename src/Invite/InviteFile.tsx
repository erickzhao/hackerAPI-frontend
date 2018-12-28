import { Box, Flex } from '@rebass/grid';
import { FieldProps } from 'formik';
import * as React from 'react';
import { FileUpload, Label, LabelText } from '../shared/Form';

export interface IInviteFileProps {
  label: string;
  value?: boolean;
  required?: boolean;
}
const InviteFileUpload: React.StatelessComponent<
  IInviteFileProps & FieldProps
> = (props) => {
  return (
    <Flex mb={'20px'}>
      <Box>
        <Label>
          <LabelText label={props.label} required={props.required} />
          <FileUpload {...props} />
        </Label>
      </Box>
    </Flex>
  );
};
export { InviteFileUpload };
export default InviteFileUpload;
