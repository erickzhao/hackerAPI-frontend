import * as React from 'react';
import { IInviteInfo } from '../config';
import { StyledTable } from '../shared/Elements';

interface IInvitesTableProps {
  results: IInviteInfo[];
  loading: boolean;
}

const InvitesTable: React.StatelessComponent<IInvitesTableProps> = (props) => {
  return (
    <StyledTable
      data={props.results}
      columns={[
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Account Type',
          accessor: 'accountType',
        },
      ]}
      loading={props.loading}
      defaultPageSize={5}
    />
  );
};

export { InvitesTable };
