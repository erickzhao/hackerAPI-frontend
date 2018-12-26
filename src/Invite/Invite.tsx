import * as React from 'react';
import { Account } from '../api/account';
import { IInviteInfo } from '../config';

interface IInviteState {
  invited: IInviteInfo[];
}

class InviteContainer extends React.Component<{}, IInviteState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      invited: [],
    };
  }
  public async componentDidMount() {
    const response = await Account.getInvites();
    this.setState({
      invited: response.data.data.invites,
    });
  }
  public render() {
    return <div />;
  }
}

export default InviteContainer;
