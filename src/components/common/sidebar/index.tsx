import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import NavItem from '../navItem';
import { Logo } from '../logo';
import { getNavLinks } from '../../../../utils/navLinks';
import { useAuth } from '@/contexts/auth';

interface IProps {
    onClose: Dispatch<SetStateAction<boolean>>;
    open: boolean;
}


function Sidebar({ open, onClose }: IProps) {
    const router = useRouter();
    const { user } = useAuth();


    useEffect(() => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose(!open);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );

    const navLinks = getNavLinks(user?.isTeacher ?? false);

    return (
        <>
            <Drawer
                anchor="left"
                onClose={onClose}
                open={open}
                PaperProps={{
                    sx: {
                        backgroundColor: 'primary.900',
                        width: 280
                    }
                }}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}
                variant="temporary"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <div>
                        <Box sx={{ p: 3 }}>
                            <NextLink
                                href="/"
                                passHref
                            >
                                <a>
                                    <Logo viewWidth={500} width={210} height={120} imageWidth={550} />
                                </a>
                            </NextLink>
                        </Box>
                        <Box sx={{ px: 2 }}>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    px: 3,
                                    py: '11px',
                                    borderRadius: 1
                                }}
                            >
                                <div>
                                    <Typography
                                        color="inherit"
                                        variant="subtitle1"
                                    >
                                        {user?.name}
                                    </Typography>
                                    <Typography
                                        color="primary.400"
                                        variant="body2"
                                    >
                                        Conquistou
                                        {' '}
                                        : {user?.score} Pontos
                                    </Typography>
                                </div>
                            </Box>
                        </Box>
                    </div>
                    <Divider
                        sx={{
                            borderColor: '#2D3748',
                            my: 3
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        {navLinks.map((item) => (
                            <NavItem
                                key={item.title}
                                icon={item.icon}
                                href={item.href}
                                title={item.title}
                            />
                        ))}
                    </Box>
                    <Divider sx={{ borderColor: '#2D3748' }} />
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
