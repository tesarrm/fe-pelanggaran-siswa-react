import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import axios from "axios";

import { Grid, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

import formatHttpApiError from 'src/helpers/formatHttpApiError';
import getCommonOptions from 'src/helpers/axios/getCommonOptions';
import StatCard from "./StatCard";

export default function TasksCompletion() {
    const [isLoading, setIsLoading] = useState(false);
    const [completionStats, setCompletionStats] = useState({
        totalSiswa: null,
        totalPelanggaranKategori: null,
        totalPelanggaran: null
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/siswa', getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setCompletionStats(prevState => ({
                        ...prevState,
                        totalSiswa: data.length
                    }));
                }
            })
            .catch((err) => {
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
            });

        axios.get('/api/pelanggaran_kategori', getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setCompletionStats(prevState => ({
                        ...prevState,
                        totalPelanggaranKategori: data.length
                    }));
                }
            })
            .catch((err) => {
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
            });

        axios.get('/api/pelanggaran', getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setCompletionStats(prevState => ({
                        ...prevState,
                        totalPelanggaran: data.length
                    }));
                }
            })
            .catch((err) => {
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [enqueueSnackbar]);

    return (
        <Box sx={{
            flexGrow: 1,
            mb: (theme) => theme.spacing(2)
        }}>
            <Grid container spacing={3}>
                <StatCard
                    title="Total Siswa"
                    value={completionStats.totalSiswa || 0}
                    loading={isLoading}
                    icon={<AssignmentIcon fontSize="small" />}
                />
                <StatCard
                    title="Total Pelanggaran Kategori"
                    value={completionStats.totalPelanggaranKategori || 0}
                    loading={isLoading}
                    icon={<AssignmentLateIcon fontSize="small" />}
                />
                <StatCard
                    title="Total Pelanggaran"
                    value={completionStats.totalPelanggaran || 0}
                    loading={isLoading}
                    icon={<CheckIcon fontSize="small" />}
                />
            </Grid>
        </Box>
    )
}
