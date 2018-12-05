import * as React from 'react';
import StyledQRCode from 'src/shared/QRCode';
import { Box } from '@rebass/grid';

interface IQRCodeProps {
    accountId: string
}

const QRCodeComponent: React.StatelessComponent<IQRCodeProps> = (props) => {
    return (
        <Box mx={'auto'}>
            <StyledQRCode value={props.accountId} renderAs={'svg'} />
        </Box>
    )
}

export default QRCodeComponent;