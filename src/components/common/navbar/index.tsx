import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';

import { Logo } from '../logo';
import { UserCircle as UserCircleIcon } from '@/icons/userCircle';
import AccountPopover from './accountPopover';

interface IProps {
    onSidebarOpen: Dispatch<SetStateAction<boolean>>;
    other: any;
}


function Navbar({ onSidebarOpen, ...other }: IProps) {
    const [hideNavbar, setHideNavbar] = useState(false);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const difference = prevScrollPos - currentScrollPos;

            setHideNavbar(currentScrollPos > 64 && difference < 0);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [imgURL, setImgURL] = useState("")
    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);

    return (
        <>
            <AppBar
                {...other}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: hideNavbar ? "none" : "block",
                    backgroundColor: (theme) => theme.palette.background.paper,
                    boxShadow: (theme) => theme.shadows[3]
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2
                    }}
                >
                    <IconButton
                        onClick={() => onSidebarOpen(true)}
                        sx={{
                            color: "neutral.200",
                            display: {
                                xs: 'inline-flex',

                            }
                        }}
                    >
                        <MenuIcon fontSize="medium" />
                    </IconButton>

                    <Box sx={{ px: 1 }} />
                    <NextLink
                        href="/"
                        passHref
                    >
                        <a className='hidden xs:block'>
                            <Logo viewWidth={490} width={190} height={135} imageWidth={453} />
                        </a>
                    </NextLink>
                    <Box sx={{ flexGrow: 1 }} />
                    <Avatar
                        onClick={() => setOpenAccountPopover(true)}
                        ref={settingsRef}
                        sx={{
                            cursor: 'pointer',
                            height: 40,
                            width: 40,
                            ml: 1
                        }}
                        src={imgURL}
                    >
                        <UserCircleIcon fontSize="small" />
                    </Avatar>
                </Toolbar>
            </AppBar>

            <AccountPopover
                anchorEl={settingsRef.current}
                open={openAccountPopover}
                onClose={() => setOpenAccountPopover(false)}
            />
        </>
    );
};

export default Navbar;