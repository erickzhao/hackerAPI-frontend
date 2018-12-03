import * as React from 'react';
import InternalError from 'src/assets/images/internalerr.svg'
import Button from 'src/shared/Button';
import Image from 'src/shared/Image';
import { Flex, Box } from '@rebass/grid';
import Paragraph from 'src/shared/Paragraph';
import H1 from 'src/shared/H1';
import { withRouter, RouteComponentProps } from 'react-router';
import MaxWidthBox from 'src/shared/MaxWidthBox';
import { Link } from 'react-router-dom';

/**
 * Container that renders Internal Error page.
 */
class InternalErrorContainer extends React.Component<RouteComponentProps>{
    constructor(props: RouteComponentProps) {
        super(props);
        
    }
    public render() {
        
            return (
                <Flex
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    px={3}
                >
                    <Box>
                        <Image src={InternalError} height={"7rem"} padding={'0rem'} />
                    </Box>
                    <Box>
                        <H1>
                            Internal Error
                        </H1>
                    </Box>
                    <MaxWidthBox fontSize={[2, 3, 4]}>
                        <Paragraph
                            center={true}
                            paddingBottom={'20px'}
                            color={'#4D4D4D'}
                        >
                            Something went wrong when we made your account, please try again later.
                        </Paragraph>
                    </MaxWidthBox>
                    <Box width={'100%'}>
                        
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection={'column'}>
                                <Box>
                                    <Link to={'/'}><Button type='button'>Try Again</Button></Link>
                                </Box>
                            </Flex>
                    </Box>
                </Flex>
            );
        
    }

}

export default withRouter<RouteComponentProps>(InternalErrorContainer);