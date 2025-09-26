import React from "react";
import { Dialog, DialogContent, Box, CircularProgress } from "@mui/material";

const LoaderDialog = ({ open = false }) => {
    
    return (
        <Dialog
            open={open}
            maxWidth="xs"
            slotProps={{
                paper: {
                    style: {
                        margin: 20,
                        padding: 0,
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }
            }}
            disableEscapeKeyDown={true}
        >
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <CircularProgress size={80} thickness={4.5} />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoaderDialog;