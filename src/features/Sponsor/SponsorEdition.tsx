import * as React from 'react';
import { RouteProps } from 'react-router';
import ManageSponsor, { ManageSponsorModes } from './SponsorManagement';

const EditSponsorContainer = (props: RouteProps) => {
  return <ManageSponsor mode={ManageSponsorModes.EDIT} {...props} />;
};

export default EditSponsorContainer;
