import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../auth/AuthContext";
import LoaderDialog from '../components/core/LoaderDialog';
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { isLoggingOutAtom } from '../store/atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { PageHeader } from '@toolpad/core/PageContainer';
import Loader from "../components/core/LoaderPage";
import useSensorEvents from "../hooks/useSensorEvents";
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Popover, Stack,  Tooltip, Typography, IconButton } from '@mui/material';

const getInitials = (name) => {
  const words = name.split(' ');
  return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
};

const stringToColor = (string) => {

    const normalise = (s = '') =>
        s.trim()                // drop leading / trailing whitespace
        .replace(/\s+/g, ' ')  // collapse multiple spaces to single
        .toLowerCase();  

    const colorPalette = [
        "#FF6EC7", // neon pink
        "#FFD700", // gold / neon yellow
        "#00FA9A", // neon green
        "#00FFFF", // aqua / neon cyan
        "#1E90FF", // neon-ish blue
        "#DA70D6", // orchid / bright purple
        "#FF4500", // neon orange-red
        "#FF1493", // deep pink
        "#FF69B4", // hot pink
        "#40E0D0", // turquoise
        "#FFA500", // vivid orange
        "#FF6347", // tomato red
        "#00BFFF", // deep sky blue
        "#7B68EE", // medium slate blue
        "#FF8C00", // dark orange
        "#00FFCC", // electric aqua
        "#BA55D3", // medium orchid
        "#FF5F1F", // vivid tangerine
        "#20B2AA", // light sea green
        "#8A2BE2", // blue violet
    ];

    const key = normalise(string);
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = key.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

    const index = Math.abs(hash) % colorPalette.length;
    return colorPalette[index];
};

const ToolbarActions = () => {

  const { user, handleLogout } = useAuth();

  const userName = user.name || "Undefined";

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false); 
  };

  const handleConfirmLogout = () => {
    setOpenDialog(false);
    handleLogout();
  };

  const open = Boolean(anchorEl);

  return(
    <Stack direction="row" alignItems="center" >


      <Tooltip arrow placement="bottom-start" title={userName}>
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            sx={{
              bgcolor: stringToColor(userName), 
              width: '40px',
              height: '40px',
              maxHeight: '40px',
              maxWidth: '40px',
            }}
          >
            {getInitials(userName)}
          </Avatar>
        </IconButton>
      </Tooltip>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack
          sx={{
            padding: 2,
            minWidth: 250,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 0.5,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: stringToColor(userName), 
                cursor: 'pointer',
              }}
            >
              {getInitials(userName)}
            </Avatar>
            
            <Stack>
              <Typography variant="h7" fontWeight="bold">
                {userName}
              </Typography>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {jobTitle}
              </Typography> */}
            </Stack>
          </Stack>

          <Divider sx={{ marginY: 1 }} />

          <Stack direction="row" justifyContent="flex-end">
            <Button variant="outlined" size="small" startIcon={<LogoutIcon />} onClick={handleLogoutClick}>
              Logout
            </Button>
          </Stack>
        </Stack>
      </Popover>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth={"xs"} fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoutIcon sx={{ marginRight: 1 }} />
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>


    </Stack>
  );


};

const Layout = () => {

  useSensorEvents();
  const logoutLoading = useAtomValue(isLoggingOutAtom);

  return (
    <DashboardLayout
      disableCollapsibleSidebar={false}
      defaultSidebarCollapsed={false} 
      slots={{
        toolbarActions: ToolbarActions,
        // sidebarFooter: SidebarFooterAccount,
      }}
    >
      <Box sx={{ p: 4, gap: 2, height: '100%', }}>
        <Suspense fallback={<Loader />}>
            <PageHeader />
            <Box sx={{ width: '100%', py: 2 }}>
              <Divider />
            </Box>
          <Outlet />
        </Suspense>
      </Box>
      {/* <GlobalToast />
      <LoaderDialog /> */}

      <LoaderDialog open={logoutLoading}/>
    </DashboardLayout>
  );

};



export default Layout;