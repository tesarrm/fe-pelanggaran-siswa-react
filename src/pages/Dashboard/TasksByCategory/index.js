import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from "axios";
import chroma from 'chroma-js';

import getCommonOptions from 'src/helpers/axios/getCommonOptions';
import formatHttpApiError from 'src/helpers/formatHttpApiError';
import StatChart from "./StatChart";
import Filters from "./Filters";

const generateRandomColors = (count) => {
    return chroma.scale('Set3').colors(count);
}

const generateChartData = (data = []) => {
    const colors = generateRandomColors(data.length);
    let chartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }
        ]
    };
    data.forEach((d, index) => {
        chartData.labels.push(d.nama);
        chartData.datasets[0].data.push(d.count);
    });
    return chartData;
}

const generateTableData = (data = []) => {
    return data.map((d) => {
        return {
            label: d.nama,
            color: `#${d.color}`,
            count: d.count
        }
    });
}

const baseApiUrl = "/api/pelanggaran_kategori/"

export default function TasksByCategory() {
    const { enqueueSnackbar } = useSnackbar();
    const [queries, setQueries] = useState({
        completed: "False"
    });
    const [apiUrl, setApiUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (queries.completed === "True" || queries.completed === "False") {
            setApiUrl(`${baseApiUrl}?completed=${queries.completed}`)
            return;
        }
        setApiUrl(baseApiUrl);
    }, [queries]);

    useEffect(() => {
        if (!apiUrl) {
            return;
        }
        setIsLoading(true);
        axios.get(apiUrl, getCommonOptions())
            .then((res) => {
                const { data } = res;
                if (data) {
                    setTableData(generateTableData(data));
                    setChartData(generateChartData(data));
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                const formattedError = formatHttpApiError(err);
                enqueueSnackbar(formattedError);
            });
    }, [enqueueSnackbar, setIsLoading, setTableData, setChartData, apiUrl]);

    return (
        <>
            <StatChart tableData={tableData} chartData={chartData} isLoading={isLoading} filters={<Filters setQueries={setQueries} />} />
            {/* Tambahkan chart lain di sini */}
            {/* <StatChart tableData={tableData} chartData={chartData} isLoading={isLoading} filters={<Filters setQueries={setQueries} />} />
            <StatChart tableData={tableData} chartData={chartData} isLoading={isLoading} filters={<Filters setQueries={setQueries} />} /> */}

                    {/* <div>
                        <h3>Bar Chart</h3>
                        <Bar data={chartData} />
                    </div>
                    <div>
                        <h3>Line Chart</h3>
                        <Line data={chartData} />
                    </div> */}
        </>
    );
}
