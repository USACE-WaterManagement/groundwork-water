import { CWMSPlot } from "@usace-watermanagement/groundwork-water";
import dayjs from "dayjs";
// import { GLOBAL_CONFIG } from "../../../../public/config/config";

const endDate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
const startDate = dayjs().subtract(120, "hour").format("YYYY-MM-DDTHH:mm:ssZ");

const PopupContent = ({ feature, onClose, config }) => {
    const layerType = feature.get("layerType");

    // timeSeriesList =[];
    const layoutOptionsElev = {
        title: {
            text: `${feature.get("name")}`,
            font: {
                family: "Arial, sans-serif",
                size: 20,
                color: "black",
            },
        },
        height: 320,
        width: 360,
        yaxis: {
            title: {
                text: "Elev",
            },
        },
        yaxis2: {
            title: {
                text: "Flow (cfs)",
            },
        },
        showlegend: true,
        legend: {
            font: {
                family: "Arial, sans-serif",
                size: 10,
            },
        },
        responsive: true,
    };

    const layoutOptionsPrecip = {
        title: {
            text: `${feature.get("name")}`,
            font: {
                family: "Arial, sans-serif",
                size: 20,
                color: "black",
            },
        },
        yaxis: {
            title: {
                text: "Precip",
            },
            autorange: false,
            range: [0, 2],
            tickvals: [0, 0.5, 1, 1.5, 2],
        },

        height: 320,
        width: 360,
        showlegend: true,
        legend: {
            font: {
                family: "Arial, sans-serif",
                size: 10,
            },
        },
        responsive: true,
    };

    let timeSeriesList = [];

    if (layerType === "lake") {
        timeSeriesList = [
            {
                id: `${feature.get("lakeElevPath")}`,
                traceOptions: {
                    name: "Elevation",
                    yaxis: "y1",
                },
            },
            {
                id: `${feature.get("lakeFlowPath")}`,
                traceOptions: {
                    name: "Inflow",
                    yaxis: "y2",
                },
            },
            {
                id: `${feature.get("outflowFlow")}`,
                traceOptions: {
                    name: "Outflow",
                    yaxis: "y2",
                },
            },
        ];
    }

    if (layerType === "precip") {
        timeSeriesList = [
            {
                id: `${feature.get("precipPath")}`,
                traceOptions: {
                    name: "Precip",
                    yaxis: "y1",
                },
            },
        ];
    }

    console.log("CDA base", config.cda_base);
    return (
        <div
            style={{
                padding: "10px",
                background: "white",
                borderRadius: "5px",
                width: "400px",
                height: "390px",
                overflow: "auto",
            }}
        >
            {layerType === "lake" && (
                <CWMSPlot
                    cdaUrl={config.cda_base}
                    timeSeries={timeSeriesList}
                    layoutOptions={layoutOptionsElev}
                    unit="EN"
                    office="LRH"
                    begin={startDate}
                    end={endDate}
                />
            )}

            {layerType === "precip" && (
                <CWMSPlot
                    cdaUrl={config.cda_base}
                    timeSeries={timeSeriesList}
                    layoutOptions={layoutOptionsPrecip}
                    unit="EN"
                    office="LRH"
                    begin={startDate}
                    end={endDate}
                />
            )}

            {!["lake", "precip"].includes(layerType) && (
                <>
                    <p>Clicked on an unknown feature type: {layerType}</p>
                </>
            )}

            <button onClick={onClose} style={{ marginTop: "5px" }}>
                Close
            </button>
        </div>
    );
};

export default PopupContent;
