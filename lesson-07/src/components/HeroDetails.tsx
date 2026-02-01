import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Box, Typography, Card, CardMedia, CardContent, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getSingleCharacter } from '../api/getCharacters';
import { useTheme } from '../providers/themeProvider/useTheme';

const HeroDetails = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    const { colors } = useTheme();

    const { data: hero, loading, error } = useRequest(
        () => getSingleCharacter(Number(id)),
        {
            refreshDeps: [id],
            ready: !!id,
        }
    )

    const handleClose = () => {
        navigate('/heroes');
    }

    if (loading) {
        return (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2, color: 'error.main' }}>
                <Typography>Error: {error.message}</Typography>
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </Box>
        );
    }

    if (!hero) return null;

    return (
        <>
        <Box sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleClose} sx={{ color: colors.text }}>
                    <CloseIcon />
                </IconButton>
            </Box>     
            <Card elevation={0} sx={{ 
                bgcolor: colors.sidebarBg,
                color: colors.text,
                border: `1px solid ${colors.borderColor}`
            }}>
                <CardMedia
                    component="img"
                    image={hero.image}
                    alt={hero.name}
                    sx={{ borderRadius: 1, mb: 2, p: 2 }}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom sx={{ color: colors.text }}>
                        {hero.name}
                    </Typography>            
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                            sx={{ 
                                width: 10, height: 10, borderRadius: '50%', 
                                bgcolor: hero.status === 'Alive' ? 'success.main' : hero.status === 'Dead' ? 'error.main' : 'grey.500',
                                mr: 1
                            }} 
                        />
                        <Typography variant="body1" sx={{ color: colors.text }}>
                            {hero.status} - {hero.species}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: colors.text, opacity: 0.7 }}>
                        Last known location:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: colors.text }}>
                        {hero.location?.name}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        </>
    );
};

export default HeroDetails;
