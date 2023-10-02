import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';

import Navbar from '@/components/common/navbar';
import Sidebar from '@/components/common/sidebar';
import MinimalSidebar from '@/components/common/minimalSidebar';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
        paddingLeft: 80
    }
}));

function AppLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        paddingTop: 8,
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>

            <Navbar setSidebarOpen={setSidebarOpen} />

            <div className='hidden lg:block'>
                <MinimalSidebar />
            </div>

            <Sidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </>
    );
}


export default AppLayout;
