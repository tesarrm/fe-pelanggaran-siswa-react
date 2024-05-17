import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  CardContent,
  Box,
  CircularProgress,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Card,
  CardHeader,
  useTheme,
} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ColorBox from "src/components/ColorBox";

ChartJS.register(ArcElement, Tooltip, Legend);

const loadingBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "300px",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export function CardContentDistributionChart({
  chartData,
  tableData,
  isLoading,
  filters,
}) {
  const [isMounted, setIsMounted] = useState(true);
  const theme = useTheme();
  const textColor =
    theme.palette.mode === "dark" ? "#fff" : ChartJS.defaults.color;

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Card elevation={4} sx={{ mb: (theme) => theme.spacing(2) }}>
      <CardHeader
        title={"Pelangaran dan Kategori"}
        titleTypographyProps={{
          variant: "h6",
        }}
      />
      {filters ? filters : null}

      {isLoading ? (
        loadingBox()
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ flex: "1 0 auto", height: "auto" }}>
                <div style={{ height: "300px", width: "100%", paddingInline:"80px" }}>
                  {chartData ? (
                    <Doughnut
                      height={300}
                      data={chartData}
                      options={{
                        cutout: "90%",
                        plugins: {
                          legend: {
                            labels: {
                              color: textColor,
                            },
                          },
                        },
                      }}
                    />
                  ) : null}
                </div>
              </CardContent>
            </Grid>

            <Grid item xs={12} md={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ColorBox color={row.color} />
                            <Box sx={{ ml: 1 }}>{row.label}</Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      )}
    </Card>
  );
}

CardContentDistributionChart.propTypes = {
  chartData: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }),
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      color: PropTypes.string,
      count: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
  filters: PropTypes.node,
};

export default React.memo(CardContentDistributionChart);
