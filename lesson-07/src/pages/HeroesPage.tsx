import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import { useNavigate, useParams, Outlet } from 'react-router-dom';

import { useCharacters } from '../providers/charactersProvider/useCharacters';
import { useTheme } from '../providers/themeProvider/useTheme';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", width: 120 },
];

const LoadingOverlay = () => {
  return (
    <LinearProgress color="secondary"/>
  );
};

const HeroesPage = () => {
    const { characters, totalCount, loading, setPage } = useCharacters();
    
    const navigate = useNavigate();
    const { id } = useParams();
    const { colors } = useTheme();

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 20,
    });

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
        setPage(model.page + 1);
    };

    const handleRowClick = (params: any) => {
        navigate(`/heroes/${params.id}`);
    };

    return (
        <>
        <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
            <Box sx={{ flexGrow: 1, height: '100%', minWidth: 0 }}>
                <DataGrid
                    rows={characters}
                    columns={columns}
                    loading={loading}
                    rowCount={totalCount}
                    
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                    pageSizeOptions={[20]}
                    
                    onRowClick={handleRowClick}
                    slots={{ loadingOverlay: LoadingOverlay }}
                    disableRowSelectionOnClick
                    
                    sx={{
                        border: 'none',
                        color: colors.text,
                        backgroundColor: colors.background,

                        '& ::-webkit-scrollbar': { width: '10px', height: '10px' },
                        '& ::-webkit-scrollbar-track': { background: colors.background },
                        '& ::-webkit-scrollbar-thumb': {
                            backgroundColor: '#555',
                            borderRadius: '5px',
                            border: `2px solid ${colors.background}`
                        },

                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: colors.gridHeader, 
                            color: colors.text,
                            borderBottom: `1px solid ${colors.borderColor}`,
                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: `${colors.gridHeader} !important`,
                            color: colors.text,
                            outline: 'none !important',
                        },
                        '& .MuiDataGrid-filler': {
                            backgroundColor: `${colors.gridHeader} !important`,
                        },
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                            backgroundColor: 'transparent !important',
                        },
                        '& .MuiDataGrid-withBorderColor': {
                            backgroundColor: 'transparent !important',
                            borderColor: `${colors.borderColor} !important`,
                        },
                        '& .MuiDataGrid-iconButtonContainer': {
                            backgroundColor: 'transparent !important', 
                            visibility: 'visible',
                            width: 'auto',
                        },
                        '& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIcon': {
                            color: `${colors.text} !important`,
                            opacity: 0.7,
                        },
                        '& .MuiDataGrid-columnHeader .MuiIconButton-root': {
                            backgroundColor: 'transparent !important',
                            color: colors.text,
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: colors.text,
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            color: colors.borderColor, 
                            visibility: 'visible',
                        },
                        '& .MuiDataGrid-columnHeader--last .MuiDataGrid-columnSeparator': {
                            display: 'none !important',
                        },
                        '& .MuiDataGrid-row': {
                            backgroundColor: colors.gridRow,
                            cursor: 'pointer',
                            borderBottom: `1px solid ${colors.borderColor}`
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: colors.gridRowHover,
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: colors.gridHeader,
                            color: colors.text,
                            borderTop: `1px solid ${colors.borderColor}`
                        },
                        '& .MuiTablePagination-root, & .MuiSvgIcon-root, & .MuiTablePagination-displayedRows': {
                            color: colors.text,
                        }
                    }}
                />
            </Box>

            {id && (
                <Box sx={{ 
                    width: 400, 
                    borderLeft: `1px solid ${colors.borderColor}`, 
                    bgcolor: colors.background, 
                    color: colors.text,
                    overflowY: 'auto' 
                }}>
                    <Outlet />
                </Box>
            )}
        </Box>
        </>
    );
};

export default HeroesPage;