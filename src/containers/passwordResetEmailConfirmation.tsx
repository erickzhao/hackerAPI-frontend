import * as React from 'react';
import resetLogo from 'src/passwordReset.svg';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import H1 from 'src/shared/H1';
import Paragraph from 'src/shared/Paragraph';
import Button from 'src/shared/Button';
import { Link } from 'react-router-dom';
import FrontendRoute from 'src/config/FrontendRoute';
import MaxWidthBox from 'src/shared/MaxWidthBox';

class PasswordResetContainer extends React.Component<{}, {}>{
    constructor(props: {}) {
        super(props);
    }
    public render() {
        return (
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Flex alignItems={'center'}>
                    <Box>
                        <Image src={resetLogo} height={"3rem"} padding={'1.0rem'} />
                    </Box>
                    <Box>
                        <H1>
                            Password reset
                        </H1>
                    </Box>
                </Flex>
                <MaxWidthBox maxWidth={'500px'} width={1}>
                    <Paragraph
                        fontSize={'20px'}
                        center={true}
                        paddingBottom={'20px'}
                        color={'#4D4D4D'}
                    >
                        We've sent you a link to reset your password. Check your inbox and follow the instructions there.
                    </Paragraph>
                </MaxWidthBox>
                <Box>
                    <Link to={FrontendRoute.LOGIN_PAGE}>
                        <Button type='button'>Login page</Button>
                    </Link>
                </Box>
            </Flex>
        )
    }
}
export default PasswordResetContainer;