import React, { useState, useEffect } from "react";
import {
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import axios from "axios";

const initialValues = {
    kategori: "all",
};

export default function Filters({ setQueries }) {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/pelanggaran_kategori", { /* tambahkan opsi yang sesuai */ })
            .then((response) => {
                setCategories(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = (values) => {
        setQueries(values);
    };

    return (
        <Box sx={{ ml: (theme) => theme.spacing(2) }}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
            >
                {(formik) => {
                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: (theme) => theme.spacing(4),
                                }}
                            >
                                <FormControl
                                    sx={{
                                        minWidth: 200,
                                        marginRight: (theme) => theme.spacing(1),
                                    }}
                                    variant="outlined"
                                >
                                    <InputLabel id="category-label">Kategori</InputLabel>
                                    <Select
                                        labelId="kategori-label"
                                        label="Kategori"
                                        id="filter-kategori"
                                        size="small"
                                        {...formik.getFieldProps("kategori")}
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.nama}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Box>
                                    <Button
                                        type="submit"
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        disabled={isLoading}
                                    >
                                        Filter
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
        </Box>
    );
}

Filters.propTypes = {
    setQueries: PropTypes.func,
};
