import {
  ErrorMessage,
  FastField,
  Formik,
  FormikProps,
  FormikValues,
} from 'formik';
import * as React from 'react';

import { Box, Flex } from '@rebass/grid';
import _ from 'lodash';
import { Account } from '../api/account';
import { IInviteInfo, REQUIRED_DESCRIPTION } from '../config';
import { Button, FormDescription, H1, MaxWidthBox } from '../shared/Elements';
import { Form } from '../shared/Form';
import { Error } from '../shared/Form/FormikElements';
import theme from '../shared/Styles/theme';
import InviteFileUpload from './InviteFile';
import { InvitesTable } from './InvitesTable';
import { getValidationSchema } from './validationSchema';

interface IInviteState {
  invited: IInviteInfo[];
  toInvite: IInviteInfo[];
  isInviting: boolean;
}

class InviteContainer extends React.Component<{}, IInviteState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      invited: [],
      toInvite: [],
      isInviting: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderFormik = this.renderFormik.bind(this);
    this.inviteUsers = this.inviteUsers.bind(this);
    this.parseCSV = this.parseCSV.bind(this);
  }
  public async componentDidMount() {
    try {
      const response = await Account.getInvites();
      this.setState({
        invited: response.data.data.invites,
      });
    } catch (e) {
      console.error('Could not get existing invites');
    }
  }
  public render() {
    return (
      <MaxWidthBox m={'auto'} maxWidth={'500px'}>
        <MaxWidthBox m={'auto'} maxWidth={'500px'}>
          <H1
            color={theme.colors.primary}
            fontSize={'30px'}
            textAlign={'center'}
            marginTop={'0px'}
            marginBottom={'20px'}
            marginLeft={'0px'}
          >
            Account invites
          </H1>
          <FormDescription textAlign={'center'}>
            {REQUIRED_DESCRIPTION}
          </FormDescription>
        </MaxWidthBox>
        <MaxWidthBox m={'auto'} width={'500px'}>
          <Formik
            onSubmit={this.handleSubmit}
            render={this.renderFormik}
            initialValues={{
              file: undefined,
            }}
            validationSchema={getValidationSchema()}
          />
          {this.state.toInvite.length > 0 ? (
            <InvitesTable
              results={this.state.toInvite}
              loading={this.state.isInviting}
            />
          ) : (
            ''
          )}
        </MaxWidthBox>
      </MaxWidthBox>
    );
  }
  private renderFormik(fp: FormikProps<any>) {
    return (
      <Form onSubmit={fp.handleSubmit}>
        <FastField
          name="file"
          component={InviteFileUpload}
          required={true}
          label={'Upload Invitation CSV'}
        />
        <ErrorMessage component={Error} name="file" />
        <Flex justifyContent={'center'}>
          <Box>
            <Button type="submit" disabled={this.state.isInviting}>
              Upload Invites
            </Button>
          </Box>
        </Flex>
      </Form>
    );
  }
  private handleSubmit(values: FormikValues) {
    const { file } = values;
    this.parseCSV(file);
  }

  private parseCSV(file: File): void {
    const fr = new FileReader();
    fr.readAsText(file);
    fr.onloadend = (e) => {
      const rows: string[] = String(fr.result)
        .split('\n')
        .sort();
      const deduped = _.uniq(rows);
      const invites: IInviteInfo[] = [];
      deduped.forEach((row, index) => {
        const cols = row.split(',');
        if (
          !(cols[0] === 'email' || cols[1] === 'accountType') &&
          cols[0] &&
          cols[1]
        ) {
          // all rows except header
          invites.push({
            email: cols[0],
            accountType: cols[1],
          });
        }
      });
      this.setState({ toInvite: invites });
    };
  }

  private async inviteUsers(newUsers: IInviteInfo[]) {
    this.setState({ isInviting: true });
    const successful = [];
    const notSuccess = [];
    for (const user of newUsers) {
      try {
        // await Account.invite(user);
        successful.push(user);
      } catch (e) {
        notSuccess.push(user);
        console.error(e);
      }
    }
    // copy for immutability
    const toInvite = this.state.toInvite.concat(successful);
    this.setState({ toInvite, isInviting: false });
  }
}

export default InviteContainer;
