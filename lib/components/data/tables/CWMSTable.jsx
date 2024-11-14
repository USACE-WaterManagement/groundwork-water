import { useEffect, useState, useRef, createRef } from "react";
import { useQuery } from "@tanstack/react-query";
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
    tsids,
    timeseriesParams,
    office,
    begin,
    end,
    interval,
    title,
    unit,
    className = "",
    responsive = true,
    loadingComponent = null,
}) {

    const tableElement = useRef([]);
    const [tableTSIDs, setTableTSIDs] = useState(null);
    const [tableData, setTableData] = useState(null);

    const table = []

    useEffect(() => {
        if (!tsids.length)
            throw Error("You must specify one or more Timeseries IDs to table.");
        if (!office) throw Error("You must specify a 3 letter ID for the office");
        if (typeof tsids == "string") {
            tsids = [tsids];
        }
        setTableTSIDs(tsids);
    }, [title, tsids, office]);

    const fetchData = async () => {
        let promises = tableTSIDs.map(async (name) => {
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
        dates.reverse()
        _data.dates = dates
        return _data;
    };
    const {
        data: tsData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["timeseries", tableTSIDs, begin, end, unit, office],
        queryFn: fetchData,
        enabled: !!tableElement.current, // Only run the query when tableElement is available
    });
    useEffect(() => {
        if (!tableElement.current || !tsData) {
            return;
        }
        tsData.dates.forEach((dt) => {
            const row = []
            Object.keys(tsData.ts).forEach((item) => {
                tsData.ts[item][0].values.forEach((val) => {
                    (dt == val[0]) && row.push(val[1])
                })
            })
            table.push([new Date(dt), row])
        })

        setTableData(table)

    }, [tsData, title]);



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
                        {item[1].map((val, indx) => (
                            <TableCell key={`cell${indx}`}>{
                                val === null ? val?.toFixed(timeseriesParams[indx].rounding)
                                    : missingString
                            }</TableCell>
                        ))}

                    </TableRow>
                ))}
            </TableBody>
        </Table>




    );
}
