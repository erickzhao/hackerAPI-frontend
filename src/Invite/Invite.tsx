import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';

import { Account } from '../api/account';
import { IInviteInfo } from '../config';
import { Button } from '../shared/Elements';
import { FileUpload, Form } from '../shared/Form';
import { Error } from '../shared/Form/FormikElements';
import { getValidationSchema } from './validationSchema';

interface IInviteState {
  invited: IInviteInfo[];
  isInviting: boolean;
}

class InviteContainer extends React.Component<{}, IInviteState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      invited: [],
      isInviting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.inviteUsers = this.inviteUsers.bind(this);
    this.parseCSV = this.parseCSV.bind(this);
  }
  public async componentDidMount() {
    const response = await Account.getInvites();
    this.setState({
      invited: response.data.data.invites,
    });
  }
  public render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        render={this.renderFormik}
        initialValues={{
          file: undefined,
        }}
        validationSchema={getValidationSchema()}
      />
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name="file"
          component={FileUpload}
          placeHolder={'Upload Invitation CSV'}
        />
        <ErrorMessage component={Error} name="file" />
        <Button type="submit">Upload Invites</Button>
      </Form>
    );
  }
  private handleSubmit(values: FormikValues) {
    const { file } = values;
    this.parseCSV(file, this.inviteUsers);
  }

  private parseCSV(
    file: File,
    callback: (invites: IInviteInfo[]) => void
  ): void {
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onloadend = (e) => {
      const rows: string[] = String(fr.result).split('\n');
      const invites: IInviteInfo[] = [];
      rows.forEach((row, index) => {
        const cols = row.split(',');
        console.log(row, cols);
        if (
          !(cols[0] === 'email' || cols[1] === 'accountType') &&
          cols[0] &&
          cols[1]
        ) {
          // not header
          invites.push({
            email: cols[0],
            accountType: cols[1],
          });
        }
      });
      callback(invites);
    };
  }

  private async inviteUsers(newUsers: IInviteInfo[]) {
    this.setState({ isInviting: true });
    const successful = [];
    const notSuccess = [];
    for (const user of newUsers) {
      try {
        await Account.invite(user);
        successful.push(user);
      } catch (e) {
        notSuccess.push(user);
        console.error(e);
      }
    }
    // copy for immutability
    const invited = Object.assign([], this.state.invited);
    invited.concat(successful);
    console.log(invited);
    this.setState({ invited, isInviting: false });
  }
}

export default InviteContainer;
