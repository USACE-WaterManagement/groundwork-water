import { useEffect, useState, useRef, createRef } from "react";
import { Configuration, TimeSeriesApi } from "cwmsjs";
import dayjs from "dayjs";
import { Table, TableBody, TableRow, TableHead, TableHeader, TableCell } from "@usace/groundwork";


const config_v2 = new Configuration({
    headers: {
        accept: "application/json;version=2",
    },
});
const ts_api = new TimeSeriesApi(config_v2);

const pageSize = 500

export default function CWMSTable({
    timeseriesParams,
    office,
    begin,
    end,
    interval,
    order,
    unit = "EN",
    missingString,
    className = "",
    responsive = true,
    loadingComponent = null,
}) {

    const tableElement = useRef([]);
    const [tableData, setTableData] = useState(null);

    const [tsData, setTsData] = useState(null);

    const table = []

    useEffect(() => {

        let tsids = []
        Object.entries(timeseriesParams).map(item => tsids.push(item[1].tsid))

        if (!tsids.length)
            throw Error("You must specify one or more Timeseries IDs to table.");

        if (!office) throw Error("You must specify a 3 letter ID for the office");

        const fetchData = async () => {
            let promises = tsids.map(async (name) => {
                try {
                    return await ts_api.getCwmsDataTimeseries({
                        name,
                        begin,
                        end,
                        pageSize,
                        unit,
                        office,
                    });
                } catch (error) {
                    if (error.response?.status === 404) {
                        console.warn(`Data for ${name} not found: 404`);
                        return null;
                    } else {
                        throw error;
                    }
                }
            });

            let values = await Promise.all(promises);
            let _data = { ts: {}, dates: [] };
            let dates = []
            if (!interval) { interval = 1 }

            values.forEach((result) => {
                if (result && result.values) {
                    if (!_data.ts[result.values]) {
                        _data.ts[result.name] = [];
                    }
                    _data.ts[result.name].push(result);
                    result.values.forEach((item) => {
                        const dt = item[0]
                        const val = item[1]
                        if (!dates.includes(dt) && val != null) {
                            if (dt % (interval * 1000 * 60) == 0) {
                                dates.push(dt)
                            }
                        }
                    })
                } else if (result === null) {
                    console.warn(`Skipping as no data was found.`);
                } else {
                    console.warn(`No unit found for ${result?.name}`);
                }
            });
            dates.sort()

            if (order) {
                if (order == "desc") { dates.reverse() }
            }

            _data.dates = dates

            setTsData(_data)

        };

        fetchData();

    }, [])


    useEffect(() => {
        if (!tableElement.current || !tsData) {
            return;
        }
        tsData.dates.forEach((dt) => {
            const row = []
            Object.keys(tsData.ts).forEach((item) => {
                let rounding = 2
                Object.entries(timeseriesParams).map(entry => {
                    if (entry[1].tsid == item && entry[1].precision != null) {
                        rounding = entry[1].precision
                    }
                })
                tsData.ts[item][0].values.forEach((val) => {
                    (dt == val[0]) && row.push(
                        val[1] ? val[1].toFixed(rounding) : null
                    )
                })
            })
            table.push([new Date(dt), row])
        })

        setTableData(table)

    }, [tsData]);


    if (!missingString) { missingString = "" }

    let precisions = []
    Object.entries(timeseriesParams).map(item => precisions.push(item.precision))

    return (
        <Table striped dense>
            <TableHead>
                <TableRow>
                    <TableHeader>Date & Time</TableHeader>
                    {timeseriesParams.map((item, index) => (
                        <TableHeader key={`header${index}`}>{item.header}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>

                {/* Each Row */}
                {tableData?.map((item, index) => (
                    <TableRow key={`row${index}`}>

                        {/* Date-Time */}
                        <TableCell key={`cell${index}`}>{dayjs(item[0]).format("ddd MMM DD HH:mm")}</TableCell>

                        {/* Loop over values */}
                        {item[1].map((val, idx) => (
                            <TableCell key={`cell${idx}`}>
                                {val === null ? missingString : val}
                            </TableCell>
                        ))}



                    </TableRow>
                ))}
            </TableBody>
        </Table>




    );
}
