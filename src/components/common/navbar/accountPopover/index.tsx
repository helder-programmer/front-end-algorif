import { Dispatch, MutableRefObject, SetStateAction, useContext, useState } from 'react';
import Router from 'next/router';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useAuth } from '@/contexts/auth';

interface IProps {
    anchorEl: any;
    onClose: Dispatch<SetStateAction<boolean>>;
    open: boolean;
    other?: any;
}


function AccountPopover({ anchorEl, onClose, open, ...other }: IProps) {
    const { user, logout } = useAuth();



    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: { width: '300px' }
            }}
            {...other}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >

                <NextLink href="/account" passHref as={'a'}>
                    <Typography variant="overline">
                        Conta
                    </Typography>
                </NextLink>

                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user?.name}
                </Typography>
            </Box>
            <MenuList
                disablePadding
                sx={{
                    '& > *': {
                        '&:first-of-type': {
                            borderTopColor: 'divider',
                            borderTopStyle: 'solid',
                            borderTopWidth: '1px'
                        },
                        padding: '12px 16px'
                    }
                }}
            >
                <MenuItem onClick={logout}>Sair</MenuItem>
            </MenuList>
        </Popover>
    );
}


export default AccountPopover;
