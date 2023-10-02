import { ReactNode } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, ListItem } from '@mui/material';

interface IProps {
    href: string;
    icon: ReactNode;
    title: string;
    titleLabel: string;
    others: any;
}


function NavItem({ href, icon, title, titleLabel, ...others }: IProps) {
    const router = useRouter();
    const active = href ? (router.pathname === href) : false;

    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 0.5
            }}
            {...others}
        >
            <NextLink
                href={href}
                passHref
            >
                <Button
                    component="a"
                    startIcon={icon}
                    disableRipple
                    title={titleLabel}
                    sx={{
                        backgroundColor: active ? 'rgba(255,255,255, 0.08)' : '',
                        borderRadius: 1,
                        color: active ? 'primary.main' : 'neutral.300',
                        fontWeight: active ? 'fontWeightBold' : '',
                        justifyContent: 'flex-start',
                        px: 3.5,
                        textAlign: 'left',
                        textTransform: 'none',
                        width: '100%',
                        '& .MuiButton-startIcon': {
                            color: active ? 'primary.main' : 'neutral.400'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.08)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {title}
                    </Box>
                </Button>
            </NextLink>
        </ListItem>
    );
};


export default NavItem;
