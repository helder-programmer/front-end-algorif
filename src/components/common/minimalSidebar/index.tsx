import { Box, Drawer } from '@mui/material';

import NavItem from '../navItem';
import { getNavLinks } from '../../../../utils/navLinks';
import { useAuth } from '@/contexts/auth';

function MinimalSidebar() {
    const { user } = useAuth();

    const navLinks = getNavLinks(user?.isTeacher ?? false);

    return (
        <div className='fixed'>
            <Drawer className='drawer'
                anchor="left"
                PaperProps={{
                    sx: {
                        backgroundColor: 'primary.800',
                        width: 80
                    }
                }}
                variant="permanent"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <div className='my-[48px]'
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        {navLinks.map((item) => (
                            <NavItem
                                key={item.title}
                                icon={item.icon}
                                href={item.href}
                                titleLabel={item.title}
                            />
                        ))}
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
};


export default MinimalSidebar;