document.addEventListener("DOMContentLoaded", function () {
    // assumes this already exists
    const output1Div = document.getElementById("output1");

    // --- Load SheetJS (xlsx) dynamically ---
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js";
    script.onload = init;
    document.head.appendChild(script);

    let office = "mvs";

    function init() {
        // --- Select File Button ---
        const fileBtn = document.createElement("button");
        fileBtn.id = "btn";
        fileBtn.className = "btn";
        fileBtn.textContent = "Select File";

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".xlsx";
        fileInput.style.display = "none";

        fileBtn.onclick = () => fileInput.click();

        output1Div.appendChild(fileBtn);
        output1Div.appendChild(fileInput);

        let tableRef = null;

        fileInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            // ============================
            // SPINNER
            // ============================
            showMainSpinner(output1Div, 1);

            reader.onload = async function (evt) {
                try {
                    const excelData = new Uint8Array(evt.target.result);

                    const workbook = XLSX.read(excelData, {
                        type: "array",
                        cellDates: false,
                        raw: false
                    });

                    const sheet = workbook.Sheets["Sheet1"];

                    const json = XLSX.utils.sheet_to_json(sheet, {
                        header: 1,
                        defval: null,
                        raw: false,
                        dateNF: "yyyy-mm-dd hh:mm"
                    });

                    console.log("Parsed JSON:", json);

                    const excelRowNumber = json.length;
                    console.log("excelRowNumber:", excelRowNumber);

                    if (excelRowNumber > 200000) {
                        alert(
                            `The Excel file contains too many rows.\n\n` +
                            `Found: ${excelRowNumber} rows.\n\n` +
                            `Maximum allowed: 200000 rows.`
                        );

                        document.getElementById("output1").replaceChildren();

                        location.reload();
                        return;
                    }

                    // Row 2, Column 2
                    const tsid = json[1][1];

                    const interval = tsid.split(".")[3];

                    // Row 2, Column 3
                    const beginDate = json[1][2]?.trim();
                    console.log("beginDate:", beginDate);

                    // Last row, Column 3
                    const lastRowIndex = json.length - 1;
                    const endDate = json[lastRowIndex][2]?.trim();
                    console.log("endDate:", endDate);

                    // Require format: yyyy-MM-dd HH:mm
                    const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

                    if (!datePattern.test(beginDate)) {
                        alert(
                            `Invalid begin date format.\n\n` +
                            `Found: "${beginDate}"\n\n` +
                            `Expected: yyyy-MM-dd HH:mm\n` +
                            `Example: 2025-11-28 00:30`
                        );

                        document.getElementById("output1").replaceChildren();

                        location.reload();
                        return;
                    }

                    if (!datePattern.test(endDate)) {
                        alert(
                            `Invalid end date format.\n\n` +
                            `Found: "${endDate}"\n\n` +
                            `Expected: yyyy-MM-dd HH:mm\n` +
                            `Example: 2025-11-28 00:30`
                        );

                        document.getElementById("output1").replaceChildren();

                        location.reload();
                        return;
                    }

                    const beginISO = new Date(beginDate.replace(" ", "T")).toISOString();
                    const endISO = new Date(endDate.replace(" ", "T")).toISOString();

                    console.log("Begin ISO:", beginISO);
                    console.log("End ISO:", endISO);
                    console.log("TSID:", tsid);

                    const apiUrl =
                        `${setBaseUrl}/timeseries` +
                        `?name=${encodeURIComponent(tsid)}` +
                        `&begin=${encodeURIComponent(beginISO)}` +
                        `&end=${encodeURIComponent(endISO)}` +
                        `&office=${office}&page-size=1000000`;

                    console.log("API URL:", apiUrl);

                    // Time Series Selection Stat
                    const tsStatDiv = document.createElement("div");
                    tsStatDiv.id = "tsStatDiv";
                    const beginDateX = new Date(beginISO);
                    const endDateX = new Date(endISO);
                    const years = ((endDateX - beginDateX) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
                    tsStatDiv.textContent = `${tsid} - ${beginISO} - ${endISO} (${years} years)`;
                    output1Div.appendChild(tsStatDiv);

                    let apiData = {}; // Default empty data

                    if ((interval === "30Minutes" || interval === "15Minutes" || interval === "10Minutes" || interval === "5Minutes" || interval === "1Hour") && years > 10) {
                        alert(
                            `The selected time series has an interval of ${interval} and spans ${years} years.\n\n This may result in a large amount of data being fetched, which could lead to performance issues or timeouts.\n\n`
                        );

                        document.getElementById("output1").replaceChildren();

                        location.reload();
                        return;
                    }

                    try {
                        const response = await fetch(apiUrl, {
                            headers: {
                                "Accept": "application/json;version=2",
                            },
                            cache: "no-cache"
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}`);
                        }

                        apiData = await response.json();
                        console.log("API Data:", apiData);

                    } catch (err) {
                        console.error("Failed to fetch existing data:", err);
                        apiData = {
                            values: []
                        }; // or {} depending on what renderTable expects
                    }

                    // Always render the table
                    renderTable(json, apiData);

                } catch (error) {
                    console.error("Error:", error);
                }
            };

            reader.readAsArrayBuffer(file);
        });

        function renderTable(excelData, apiData) {

            console.log("Calling renderTable...........................");
            console.log("excelData: ", excelData);
            console.log("apiData: ", apiData);
            console.log("Calling renderTable...........................");

            // Clear previous content
            output1Div.innerHTML = "";

            // =========================
            // Create Plot Container
            // =========================
            const plotDiv = document.createElement("div");
            plotDiv.id = "plotDiv";
            plotDiv.style.width = "100%";
            plotDiv.style.height = "860px";
            plotDiv.style.border = "1px solid black";
            plotDiv.style.background = "pink";
            plotDiv.style.marginBottom = "20px";
            plotDiv.style.overflow = "hidden";

            output1Div.appendChild(plotDiv);

            // -------------------------
            // NOTE: All data in excelData are strings, so we need to convert them to numbers and dates for plotting
            // -------------------------

            // =========================
            // Build Plot Data
            // =========================
            const headers = excelData[0];

            const expectedHeaders = [
                "OFFICE",
                "TSID",
                "DATE TIME",
                "VALUE",
                "QUALITY CODE",
                "DATA ENTRY DATE",
                "TEXT VALUE"
            ];

            // Validate header order
            for (let i = 0; i < expectedHeaders.length; i++) {
                if (headers[i]?.trim() !== expectedHeaders[i]) {
                    alert(
                        `Invalid Excel format.\n\nExpected column ${i + 1} to be "${expectedHeaders[i]}", but found "${headers[i] || "(blank)"}".`
                    );

                    document.getElementById("output1").replaceChildren();

                    location.reload();
                    return;
                }
            }

            const officeCol = headers.indexOf("OFFICE");
            const tsidCol = headers.indexOf("TSID");
            const dateCol = headers.indexOf("DATE TIME");
            const valueCol = headers.indexOf("VALUE");
            const qualityCodeCol = headers.indexOf("QUALITY CODE");
            const dataEntryDateCol = headers.indexOf("DATA ENTRY DATE");
            const textValueCol = headers.indexOf("TEXT VALUE");
            console.log("officeCol:", officeCol);
            console.log("tsidCol:", tsidCol);
            console.log("dateCol:", dateCol);
            console.log("valueCol:", valueCol);
            console.log("qualityCodeCol:", qualityCodeCol);
            console.log("dataEntryDateCol:", dataEntryDateCol);
            console.log("textValueCol:", textValueCol);

            const xExcel = [];
            const yExcel = [];

            const xExcelCentralTime = [];
            const yExcelCentralTime = [];

            const xExcelTextCentralTime = [];
            const yExcelTextCentralTime = [];

            const seenDates = new Set();

            for (let i = 1; i < excelData.length; i++) {

                const row = excelData[i];
                if (!row) continue;

                const dateStr = row[dateCol];
                const rawValue = row[valueCol];
                const value = parseFloat(rawValue);
                const valueText = row[textValueCol];

                // Skip empty rows
                if (!dateStr || rawValue === "" || rawValue === null || rawValue === undefined) {
                    continue;
                }

                // Check for duplicate dates
                if (seenDates.has(dateStr)) {
                    alert(`Duplicate DATE TIME found on row ${i + 1}:\n\n${dateStr}`);

                    document.getElementById("output1").replaceChildren();

                    location.reload();
                    return;
                }

                seenDates.add(dateStr);

                // Alert if VALUE is not numeric
                if (isNaN(value)) {
                    alert(`Row ${i + 1}: VALUE "${rawValue}" is not a valid number.`);

                    document.getElementById("output1").replaceChildren();

                    location.reload();
                    return;
                }

                // Excel datetime: "2026-11-28 00:30"
                const [datePart, timePart] = dateStr.split(" ");

                const [year, month, day] = datePart.split("-").map(Number);
                const [hour, minute] = timePart.split(":").map(Number);

                // Treat Excel datetime as Central Time
                const centralDate = luxon.DateTime.fromObject(
                    {
                        year,
                        month,
                        day,
                        hour,
                        minute
                    },
                    {
                        zone: "America/Chicago"
                    }
                );

                // Convert to UTC for Plotly / DB use
                const utcISO = centralDate.toUTC().toISO();

                xExcel.push(utcISO);
                yExcel.push(value);

                // Keep Central Time (DST-aware)
                xExcelCentralTime.push(
                    centralDate.toFormat("yyyy-MM-dd'T'HH:mm:ss")
                );
                yExcelCentralTime.push(value);

                xExcelTextCentralTime.push(
                    centralDate.toFormat("yyyy-MM-dd'T'HH:mm:ss")
                );
                yExcelTextCentralTime.push(valueText);
            }

            console.log("xExcel:", xExcel);
            console.log("yExcel:", yExcel);

            console.log("xExcelCentralTime:", xExcelCentralTime);
            console.log("yExcelCentralTime:", yExcelCentralTime);

            console.log("xExcelTextCentralTime:", xExcelTextCentralTime);
            console.log("yExcelTextCentralTime:", yExcelTextCentralTime);

            // =========================
            // Build Existing Data Series
            // =========================
            const existingX = [];
            const existingY = [];

            const apiDataSet = new Set();

            // Loop through apiData.values to get the timestamp and value columns
            if (apiData && apiData.values) {

                apiData.values.forEach(row => {

                    const timestamp = row[0];
                    const value = parseFloat(row[1]);

                    if (!timestamp || isNaN(value)) return;

                    const dt = new Date(timestamp);
                    const time = dt.getTime();

                    // =========================
                    // Plotly data
                    // =========================
                    existingX.push(dt);

                    // Keep numeric for Plotly
                    existingY.push(Number(value.toFixed(2)));


                    // =========================
                    // Match lookup
                    // =========================
                    // Store value with 2 decimals
                    const key = `${time}|${value.toFixed(2)}`;

                    apiDataSet.add(key);
                });
            }
            console.log("apiDataSet:", apiDataSet);

            // =========================
            // Create Table
            // =========================

            // clear old table if exists
            if (tableRef) tableRef.remove();

            const table = document.createElement("table");
            table.id = "dataTable";
            table.border = "1";
            table.style.borderCollapse = "collapse";

            // =========================
            // Build Excel Match / New Data Arrays
            // =========================
            const matchedExcelX = [];
            const matchedExcelY = [];

            const newExcelX = [];
            const newExcelY = [];

            let officeStrExpected = null;

            // Loop through excelData starting from row 1 (skip header) to get the date and value columns
            for (let i = 1; i < excelData.length; i++) {

                const row = excelData[i];

                if (!row) continue;

                const officeStr = row[officeCol]?.toString().trim();

                // console.log(`Row ${i + 1} OFFICE:`, officeStr);

                // Check OFFICE consistency
                if (!officeStrExpected) {
                    officeStrExpected = officeStr; // First valid office
                } else if (officeStr !== officeStrExpected) {

                    alert(
                        `OFFICE mismatch detected.\n\n` +
                        `Expected OFFICE: ${officeStrExpected}\n` +
                        `Found OFFICE: ${officeStr}\n` +
                        `Row: ${i + 1}`
                    );

                    document.getElementById("output1").replaceChildren();

                    location.reload();
                    return;
                }

                const dateStr = row[dateCol];
                const value = parseFloat(row[valueCol]);


                if (!dateStr || isNaN(value)) continue;


                const dt = luxon.DateTime.fromFormat(
                    dateStr,
                    "yyyy-MM-dd HH:mm",
                    {
                        zone: "America/Chicago"
                    }
                );

                if (!dt.isValid) {
                    console.warn("Invalid Excel date:", dateStr);
                    continue;
                }

                const jsDate = dt.toJSDate();

                const time = jsDate.getTime();


                // Same formatting as apiDataSet
                const key = `${time}|${value.toFixed(2)}`;


                if (apiDataSet.has(key)) {

                    matchedExcelX.push(jsDate);
                    matchedExcelY.push(Number(value.toFixed(2)));

                } else {

                    newExcelX.push(jsDate);
                    newExcelY.push(Number(value.toFixed(2)));
                }
            }

            // Do the same for the existing excelData:
            const matchedExistingX = [];
            const matchedExistingY = [];

            const newExistingX = [];
            const newExistingY = [];

            if (apiData && apiData.values) {

                apiData.values.forEach(row => {

                    const timestamp = row[0];
                    const value = parseFloat(row[1]);

                    if (!timestamp || isNaN(value)) return;

                    const dt = new Date(Number(timestamp));

                    const key = `${dt.getTime()}|${value.toFixed(2)}`;

                    if (apiDataSet.has(key)) {
                        matchedExistingX.push(dt);
                        matchedExistingY.push(Number(value.toFixed(2)));
                    } else {
                        newExistingX.push(dt);
                        newExistingY.push(Number(value.toFixed(2)));
                    }

                });
            }

            function renderPlot(mode) {

                let traces = [];

                switch (mode) {

                    case "matched":

                        traces = [
                            {
                                x: matchedExistingX,
                                y: matchedExistingY,
                                mode: "markers",
                                type: "scatter",
                                name: "Existing Data",
                                marker: {
                                    size: 10
                                }
                            },
                            {
                                x: matchedExcelX,
                                y: matchedExcelY,
                                mode: "markers",
                                type: "scatter",
                                name: "Excel Data",
                                marker: {
                                    size: 5
                                }
                            }
                        ];

                        break;

                    case "nonmatched":

                        traces = [
                            {
                                x: newExistingX,
                                y: newExistingY,
                                mode: "markers",
                                type: "scatter",
                                name: "Existing Data",
                                marker: {
                                    size: 10
                                }
                            },
                            {
                                x: newExcelX,
                                y: newExcelY,
                                mode: "markers",
                                type: "scatter",
                                name: "Excel Data",
                                marker: {
                                    size: 5
                                }
                            }
                        ];

                        break;

                    default:

                        traces = [
                            {
                                x: existingX,
                                y: existingY,
                                mode: "markers",
                                type: "scatter",
                                name: "Existing Data",
                                marker: {
                                    size: 10
                                }
                            },
                            {
                                x: xExcelCentralTime,
                                y: yExcelCentralTime,
                                customdata: yExcelTextCentralTime,
                                mode: "markers",
                                type: "scatter",
                                name: "Excel Data",
                                marker: {
                                    size: 5
                                },
                                hovertemplate:
                                    "Excel Data: %{y} (%{customdata})<extra></extra>"
                            }
                        ];
                }

                Plotly.react(plotDiv, traces, {
                    title: {
                        text: "Time Series Data",
                        font: {
                            family: "Arial",
                            size: 24,
                            weight: "bold"
                        }
                    },

                    margin: {
                        l: 80,
                        r: 30,
                        t: 80,
                        b: 80
                    },

                    xaxis: {
                        title: {
                            text: "Date Time (Local Time)",
                            font: {
                                family: "Arial",
                                size: 20
                            }
                        },
                        showline: true,
                        mirror: "allticks",
                        linecolor: "black",
                        linewidth: 2
                    },

                    yaxis: {
                        title: {
                            text: "Level",
                            font: {
                                family: "Arial",
                                size: 20
                            }
                        },
                        showline: true,
                        mirror: "allticks",
                        linecolor: "black",
                        linewidth: 2
                    },
                    hovermode: "x unified",

                    showlegend: true,

                    legend: {
                        orientation: "h",
                        x: 0,
                        y: -0.2
                    },
                });
            }

            // <-- Put it here
            renderPlot("all");

            // =========================
            // Filter Dropdown
            // =========================
            const filterDiv = document.createElement("div");
            filterDiv.style.marginBottom = "10px";

            const filterLabel = document.createElement("label");
            filterLabel.textContent = "Show: ";
            filterLabel.style.marginRight = "5px";

            const filterSelect = document.createElement("select");

            const optionAll = document.createElement("option");
            optionAll.value = "all";
            optionAll.textContent = "All Data Points";

            const optionMatched = document.createElement("option");
            optionMatched.value = "matched";
            optionMatched.textContent = "Existing Data Points Only";

            const optionNonMatched = document.createElement("option");
            optionNonMatched.value = "nonmatched";
            optionNonMatched.textContent = "New Data Points Only";

            filterSelect.appendChild(optionAll);
            filterSelect.appendChild(optionMatched);
            filterSelect.appendChild(optionNonMatched);
            filterSelect.value = "all";

            filterDiv.appendChild(filterLabel);
            filterDiv.appendChild(filterSelect);

            // =========================
            // Render Table
            // =========================
            excelData.forEach((row, rowIndex) => {

                const tr = document.createElement("tr");

                let rowHasMatch = false;

                // =========================
                // Check DATE TIME + VALUE match
                // =========================
                if (rowIndex > 0) {

                    const dateValue = row[dateCol];
                    const rowValue = parseFloat(row[valueCol]);

                    if (dateValue && !isNaN(rowValue)) {

                        const dt = new Date(
                            dateValue.replace(" ", "T")
                        );

                        const key = `${dt.getTime()}|${rowValue.toFixed(2)}`;

                        if (apiDataSet.has(key)) {
                            rowHasMatch = true;
                        }
                    }
                }

                // =========================
                // Build Table Row
                // =========================
                row.forEach((value, colIndex) => {

                    const cell = document.createElement(
                        rowIndex === 0 ? "th" : "td"
                    );

                    const header = excelData[0][colIndex];

                    if (
                        header === "DATE TIME" &&
                        rowIndex > 0
                    ) {
                        value = new Date(
                            value.replace(" ", "T")
                        );
                    }

                    cell.textContent = value ?? "";
                    cell.style.padding = "4px";

                    tr.appendChild(cell);
                });


                // =========================
                // Highlight matched rows
                // =========================
                if (rowHasMatch) {

                    tr.style.backgroundColor = "pink";
                    tr.classList.add("matched-row");
                }

                table.appendChild(tr);
            });

            // =========================
            // Filter Logic
            // =========================
            filterSelect.addEventListener("change", function () {

                const showMode = this.value;

                // Existing table filtering...
                Array.from(table.rows).forEach((row, index) => {

                    if (index === 0) {
                        row.style.display = "";
                        return;
                    }

                    const isMatched = row.classList.contains("matched-row");

                    switch (showMode) {
                        case "all":
                            row.style.display = "";
                            break;

                        case "matched":
                            row.style.display = isMatched ? "" : "none";
                            break;

                        case "nonmatched":
                            row.style.display = !isMatched ? "" : "none";
                            break;
                    }
                });

                // Update Plotly
                renderPlot(showMode);
            });

            // =========================
            // Get Filtered Data
            // =========================
            function getFilteredTableData() {

                const selectedMode = filterSelect.value;

                const filteredData = [];

                Array.from(table.rows).forEach((row, index) => {

                    const isMatched =
                        row.classList.contains("matched-row");

                    // Include header row
                    if (index === 0) {

                        filteredData.push(
                            Array.from(row.cells).map(
                                cell => cell.textContent
                            )
                        );

                        return;
                    }

                    let includeRow = false;

                    switch (selectedMode) {

                        case "all":
                            includeRow = true;
                            break;

                        case "matched":
                            includeRow = isMatched;
                            break;

                        case "nonmatched":
                            includeRow = !isMatched;
                            break;
                    }

                    if (includeRow) {

                        filteredData.push(
                            Array.from(row.cells).map(
                                cell => cell.textContent
                            )
                        );
                    }
                });

                return filteredData;
            }

            // =========================
            // Buttons
            // =========================
            createSaveButton(getFilteredTableData);
            createDeleteButton(getFilteredTableData);

            const refreshBtn = document.createElement("button");
            refreshBtn.id = "cdaBtn";
            refreshBtn.className = "btn";
            refreshBtn.textContent = "Refresh";
            refreshBtn.addEventListener("click", function () {
                location.reload();
            });
            output1Div.appendChild(refreshBtn);

            // =========================
            // Status Divs
            // =========================
            let statusContainer = document.getElementById("statusContainer");
            if (!statusContainer) {
                statusContainer = document.createElement("div");
                statusContainer.id = "statusContainer";
                output1Div.appendChild(statusContainer);
            }

            // =========================
            // Add to Page
            // =========================
            output1Div.appendChild(filterDiv);
            output1Div.appendChild(table);

            tableRef = table;

            hideMainSpinner(1);
        }

        function createSaveButton(getFilteredTableData) {
            const cdaBtn = document.createElement("button");
            cdaBtn.id = "cdaBtn";
            cdaBtn.className = "btn";
            cdaBtn.textContent = "Save";
            output1Div.appendChild(cdaBtn);

            // =========================================================
            // Login State Controller
            // =========================================================

            async function loginCDA() {
                if (await isLoggedIn()) return true;
                window.location.href = `${documentRoot}/CWMSLogin/login?OriginalLocation=${encodeURIComponent(window.location.href)}`;
            }

            async function isLoggedIn() {
                try {
                    const response = await fetch(`${setBaseUrl}/auth/keys`, {
                        method: "GET"
                    });

                    if (response.status === 401) return false;

                    console.log('status', response.status);
                    return true;

                } catch (error) {
                    console.error('Error checking login status:', error);
                    return false;
                }
            }

            async function loginStateController() {
                try {
                    // ✅ disable safely
                    if (cdaBtn) cdaBtn.disabled = true;

                    const loggedIn = await isLoggedIn();

                    // ✅ set button text
                    if (cdaBtn) {
                        cdaBtn.innerText = loggedIn ? "Save" : "Login";
                    }

                } catch (err) {
                    console.error("❌ loginStateController error:", err);

                    // safe fallback
                    if (cdaBtn) cdaBtn.innerText = "Login";

                } finally {
                    // ✅ always re-enable
                    if (cdaBtn) cdaBtn.disabled = false;
                }
            }

            // =========================================================
            // Spinner
            // =========================================================

            function showSpinner() {
                const statusDiv = document.getElementById("status-6");
                if (!statusDiv) return;

                // prevent duplicate spinner
                if (document.getElementById("loadingSpinner")) return;

                const spinner = document.createElement("img");

                spinner.src = `${documentRoot}/mvs/cwms-data-upload/images/loading2.gif`;

                spinner.id = "loadingSpinner";
                spinner.className = "loading-spinner";

                statusDiv.appendChild(spinner);
            }

            function hideSpinner() {
                const spinner = document.getElementById("loadingSpinner");
                if (spinner) spinner.remove();
            }

            function setStatus(text) {
                const msg = document.getElementById("statusMsg-6");
                if (msg) msg.textContent = text ?? "";
            }

            function addStatus(text) {
                const msg = document.getElementById("statusMsg-6");
                if (!msg) return;
                const t = (text ?? "").toString();
                msg.textContent += (msg.textContent ? "\n" : "") + t;
            }

            loginStateController();

            setInterval(async () => {
                loginStateController();
            }, 10000);

            cdaBtn.onclick = async () => {

                // =========================================================
                // Login path
                // =========================================================
                if (cdaBtn.innerText === "Login") {
                    showSpinner();
                    try {
                        const loginResult = await loginCDA();

                        cdaBtn.innerText = loginResult ? "Submit" : "Login";
                        setStatus(loginResult ? "" : "Failed to Login!");

                    } catch (err) {
                        console.error(err);
                        setStatus("Failed to Login!");
                        cdaBtn.innerText = "Login";

                    } finally {
                        hideSpinner();
                    }

                    return;
                }

                console.log("🚀 Save button clicked");

                const rows = getFilteredTableData();
                console.log("Rows to save:", rows);

                const nameMap = {
                    "BLANK": "logs"
                };

                let dataPayloads = [];
                let textPayloads = [];

                for (let i = 1; i < rows.length; i++) {

                    const row = rows[i];

                    console.log(`➡️ Processing row ${i}`, row);

                    if (!row || row.length < 7) {

                        console.warn(
                            `⚠️ Skipping row ${i} (not enough columns)`
                        );

                        continue;
                    }

                    const office = row[0]?.trim();

                    const mappedName =
                        nameMap[row[1]?.trim()] ||
                        row[1]?.trim();

                    const isDailyTSID = mappedName?.includes('.1Day.');

                    const dateStr = row[2]?.trim();

                    const value = row[3]?.trim() || null;

                    const quality = Number(
                        row[4]?.trim()
                    );

                    const dataEntryDate =
                        row[5]?.trim();

                    const textVal =
                        row[6]?.trim();

                    // console.log("🧾 Row data:", {
                    //     office,
                    //     mappedName,
                    //     dateStr,
                    //     value,
                    //     quality,
                    //     dataEntryDate,
                    //     textVal,
                    //     isDailyTSID
                    // });

                    // Keep track of duplicate local timestamps
                    window.dstDuplicateMap ??= new Map();

                    const dateObj = new Date(dateStr);

                    if (isNaN(dateObj.getTime())) {
                        console.error(`❌ Invalid date in row ${i}:`, dateStr);
                        continue;
                    }

                    let utcMillis;

                    if (isDailyTSID) {

                        // Preserve local Central time for daily TSIDs
                        const tzOffsetMinutes = dateObj.getTimezoneOffset();

                        utcMillis = Date.UTC(
                            dateObj.getFullYear(),
                            dateObj.getMonth(),
                            dateObj.getDate(),
                            dateObj.getHours(),
                            dateObj.getMinutes(),
                            dateObj.getSeconds()
                        );

                        // Apply the local timezone offset
                        utcMillis += tzOffsetMinutes * 60 * 1000;

                    } else {

                        // Intraday data: use native conversion + DST duplicate handling
                        utcMillis = dateObj.getTime();
                    }

                    // Detect duplicate local times (DST fall-back)
                    if (isDailyTSID === false) {
                        const key = dateStr;

                        const count = window.dstDuplicateMap.get(key) || 0;

                        if (count > 0) {
                            // Second occurrence of the same local time
                            utcMillis += 60 * 60 * 1000;

                            console.warn(
                                `DST duplicate detected: ${dateStr} -> ${new Date(utcMillis).toISOString()}`
                            );
                        }

                        window.dstDuplicateMap.set(key, count + 1);
                    }

                    const isoDate = new Date(utcMillis).toISOString();

                    const nowIso =
                        new Date().toISOString();

                    // console.log(`📅 Row ${i} ISO date:`, isoDate);

                    // =========================
                    // TEXT PAYLOAD
                    // =========================
                    let textPayload = null;
                    // Skip rows with no text value
                    if (textVal && textVal.trim() !== "") {
                        textPayload = {
                            "office-id": office || "MVS",
                            "name": mappedName,
                            "interval-offset": 0,
                            "time-zone": "GMT",
                            "date-version-type": "MAX_AGGREGATE",
                            "regular-text-values": [
                                {
                                    "date-time": isoDate,
                                    "data-entry-date":
                                        !dataEntryDate ||
                                            dataEntryDate === "NA" ||
                                            dataEntryDate.trim() === ""
                                            ? nowIso
                                            : dataEntryDate,
                                    "text-value": textVal,
                                    "filename": "cwms-data-upload.txt",
                                    "media-type": "text/plain",
                                    "quality-code": isNaN(quality) ? 0 : quality,
                                    "dest-flag": 0,
                                    "value-url": `${setBaseUrl}/timeseries/text/ignored?text-id=someId&office-id=MVS&value=true`
                                }
                            ]
                        };

                        textPayloads.push(textPayload);
                    }

                    // =========================
                    // NUMERIC PAYLOAD
                    // =========================
                    if (value !== null && value.trim() !== "") {

                        const numericPayload = {

                            name: mappedName,

                            "office-id":
                                office || "MVS",

                            units: "ft",

                            values: [
                                [
                                    isoDate,
                                    Number(value),
                                    isNaN(quality)
                                        ? 0
                                        : quality
                                ]
                            ]
                        };

                        dataPayloads.push(numericPayload);
                    }
                }

                console.log(
                    "✅ Numeric Payloads:",
                    dataPayloads
                );

                console.log(
                    "✅ Text Payloads:",
                    textPayloads
                );

                console.log("📦 FINAL textPayloads:", textPayloads);
                console.log("📦 FINAL dataPayloads (raw):", dataPayloads);

                // -----------------------------
                // GROUPING LOGIC
                // -----------------------------
                const map = new Map();

                dataPayloads.forEach((item, idx) => {
                    const key = `${item.name}|${item["office-id"]}|${item.units}`;

                    if (!map.has(key)) {
                        console.log("🆕 Creating group:", key);
                        map.set(key, {
                            name: item.name,
                            "office-id": item["office-id"],
                            units: item.units,
                            values: []
                        });
                    }

                    map.get(key).values.push(...item.values);
                });

                dataPayloads = Array.from(map.values());

                console.log("📊 GROUPED dataPayloads:", dataPayloads);

                // -----------------------------
                // CHECK FOR DUPLICATE TIMES
                // -----------------------------
                dataPayloads.forEach(payload => {
                    const seen = new Set();
                    const duplicates = new Set();

                    payload.values.forEach(([time]) => {
                        if (seen.has(time)) {
                            duplicates.add(time);
                        } else {
                            seen.add(time);
                        }
                    });

                    if (duplicates.size > 0) {
                        console.warn(
                            `⚠️ ${payload.name} has ${duplicates.size} duplicate timestamp(s):`,
                            [...duplicates]
                        );
                    }
                });

                // -----------------------------
                // API FUNCTIONS
                // -----------------------------
                async function createTS(payload) {
                    console.log("📡 createTS request payload:", payload);

                    const response = await fetch(
                        `${setBaseUrl}/timeseries?store-rule=REPLACE%20ALL&override-protection=true`,
                        {
                            method: "POST",
                            cache: "no-cache",
                            headers: { "Content-Type": "application/json;version=2" },
                            body: JSON.stringify(payload)
                        }
                    );

                    console.log("📡 createTS response status:", response.status);

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("❌ createTS failed:", errorText);
                        throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }

                    console.log("✅ createTS success");
                }

                async function writeTSText(payload) {
                    console.log("📡 writeTSText payload:", payload);

                    const response = await fetch(
                        `${setBaseUrl}/timeseries/text?replace-all=true`,
                        {
                            method: "POST",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json;version=2"
                            },
                            body: JSON.stringify(payload)
                        }
                    );

                    console.log("📡 writeTSText status:", response.status);

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("❌ writeTSText failed:", errorText);
                        throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }

                    console.log("✅ writeTSText success");
                }

                // -----------------------------
                // DATA STATUS
                // -----------------------------
                let dataStatusDiv = document.getElementById("dataStatusDiv");

                if (!dataStatusDiv) {
                    dataStatusDiv = document.createElement("div");
                    dataStatusDiv.id = "dataStatusDiv";
                    dataStatusDiv.style.marginTop = "10px";
                    dataStatusDiv.style.padding = "8px";
                    dataStatusDiv.style.border = "1px solid #ccc";
                    dataStatusDiv.style.borderRadius = "4px";

                    statusContainer.appendChild(dataStatusDiv);
                }

                // -----------------------------
                // TEXT STATUS
                // -----------------------------
                let textStatusDiv = document.getElementById("textStatusDiv");

                if (!textStatusDiv) {
                    textStatusDiv = document.createElement("div");
                    textStatusDiv.id = "textStatusDiv";
                    textStatusDiv.style.marginTop = "10px";
                    textStatusDiv.style.padding = "8px";
                    textStatusDiv.style.border = "1px solid #ccc";
                    textStatusDiv.style.borderRadius = "4px";

                    statusContainer.appendChild(textStatusDiv);
                }

                async function createTSInChunks(payload, dataStatusDiv, chunkSize = 1) {
                    const values = payload.values ?? [];
                    const total = values.length;
                    const totalChunks = Math.ceil(total / chunkSize);

                    console.log(`Total values: ${total}`);

                    for (let i = 0; i < total; i += chunkSize) {
                        const chunkNumber = Math.floor(i / chunkSize) + 1;

                        const chunk = values.slice(i, i + chunkSize);

                        const chunkPayload = {
                            ...payload,
                            values: chunk
                        };

                        dataStatusDiv.textContent =
                            `⏳ Uploading chunk ${chunkNumber} of ${totalChunks} (${chunk.length.toLocaleString()} values)...`;
                        dataStatusDiv.style.color = "blue";

                        console.log(
                            `Uploading chunk ${chunkNumber} of ${totalChunks} (${chunk.length} values)`
                        );

                        await createTS(chunkPayload);

                        dataStatusDiv.textContent =
                            `✅ Uploaded chunk ${chunkNumber} of ${totalChunks}`;
                        dataStatusDiv.style.color = "blue";
                    }

                    console.log("✅ All chunks uploaded.");
                }

                // -----------------------------
                // EXECUTION DATA PAYLOADS
                // -----------------------------
                try {
                    dataStatusDiv.textContent = "⏳ Processing data payload...";
                    dataStatusDiv.style.color = "blue";

                    const formattedDataPayload = dataPayloads[0];
                    console.log("📦 formattedDataPayload:", formattedDataPayload);

                    console.log("===============================================================================");
                    console.log("SAVE DATA PAYLOAD");
                    console.log("===============================================================================");
                    console.log("🎯 Using first data grouped payload:", formattedDataPayload);

                    // await createTS(formattedDataPayload);
                    await createTSInChunks(formattedDataPayload, dataStatusDiv);

                    dataStatusDiv.textContent =
                        "✅ Success: Time series created successfully.";
                    dataStatusDiv.style.color = "green";
                } catch (err) {
                    console.error("🔥 Error during API processing:", err);

                    dataStatusDiv.textContent =
                        `❌ Error: ${err.message || err}`;
                    dataStatusDiv.style.color = "red";
                }

                // -----------------------------
                // EXECUTION TEXT PAYLOADS
                // -----------------------------

                async function sendPayloads(textPayloads) {
                    const total = textPayloads.length;

                    textStatusDiv.textContent = `⏳ Starting upload: 0 / ${total}`;
                    textStatusDiv.style.color = "blue";

                    let successCount = 0;
                    let failCount = 0;
                    let skippedCount = 0;

                    console.log("===============================================================================");
                    console.log("SAVE TEXT PAYLOAD");
                    console.log("===============================================================================");

                    for (let i = 0; i < total; i++) {
                        const payload = textPayloads[i];

                        // Skip null/undefined payloads
                        if (payload == null) {
                            skippedCount++;
                            console.warn(`⏭️ Skipping null payload at index ${i}`);
                            continue;
                        }

                        try {
                            textStatusDiv.textContent =
                                `⏳ Processing ${i + 1} / ${total}...`;
                            textStatusDiv.style.color = "blue";

                            await writeTSText(payload);

                            successCount++;

                            textStatusDiv.textContent =
                                `✅ Progress: ${i + 1}/${total} | Success: ${successCount} | Failed: ${failCount} | Skipped: ${skippedCount}`;
                            textStatusDiv.style.color = "green";

                        } catch (err) {
                            failCount++;

                            textStatusDiv.textContent =
                                `⚠️ Progress: ${i + 1}/${total} | Success: ${successCount} | Failed: ${failCount} | Skipped: ${skippedCount}`;
                            textStatusDiv.style.color = "orange";

                            console.error(`🔥 Error on payload ${i + 1}:`, err);
                        }
                    }

                    if (failCount === 0) {
                        textStatusDiv.textContent =
                            `✅ Success: ${successCount}/${total} | Skipped: ${skippedCount}. Text time series created successfully.`;
                        textStatusDiv.style.color = "green";
                    } else {
                        textStatusDiv.textContent =
                            `🏁 Completed with issues. Success: ${successCount}, Failed: ${failCount}, Skipped: ${skippedCount}`;
                        textStatusDiv.style.color = "red";
                    }
                }

                sendPayloads(textPayloads);
            };
        }

        function createDeleteButton(getFilteredTableData) {

            const cdaBtnDelete = document.createElement("button");
            cdaBtnDelete.className = "btn";
            cdaBtnDelete.textContent = "Delete";
            output1Div.appendChild(cdaBtnDelete);

            const rows = getFilteredTableData();

            const nameMap = {
                "BLANK": "logs"
            };

            let tsid = null;

            for (let i = 1; i < rows.length; i++) {

                const row = rows[i];

                if (!row || row.length < 7) {
                    console.warn(`⚠️ Skipping row ${i} (not enough columns)`);
                    continue;
                }

                const mappedName =
                    nameMap[row[1]?.trim()] ||
                    row[1]?.trim();

                if (!tsid) {
                    // First valid TSID
                    tsid = mappedName;
                } else if (mappedName !== tsid) {
                    alert(
                        `TSID mismatch on row ${i + 1}.\n\n` +
                        `Expected: ${tsid}\n` +
                        `Found: ${mappedName}`
                    );

                    document.getElementById("output1").replaceChildren();

                    location.reload();
                    return;
                }
            }

            console.log("🗑️ TSID:", tsid);

            // =========================================================
            // Login State Controller
            // =========================================================

            async function loginCDA() {
                if (await isLoggedIn()) return true;
                window.location.href = `${setBaseUrl}/CWMSLogin/login?OriginalLocation=${encodeURIComponent(window.location.href)}`;
            }

            async function isLoggedIn() {
                try {
                    const response = await fetch(`${setBaseUrl}/auth/keys`, {
                        method: "GET"
                    });

                    if (response.status === 401) return false;

                    console.log('status', response.status);
                    return true;

                } catch (error) {
                    console.error('Error checking login status:', error);
                    return false;
                }
            }

            async function loginStateController() {
                try {
                    // ✅ disable safely
                    if (cdaBtnDelete) cdaBtnDelete.disabled = true;

                    const loggedIn = await isLoggedIn();

                    // ✅ set button text
                    if (cdaBtnDelete) {
                        cdaBtnDelete.innerText = loggedIn ? "Delete" : "Login";
                    }

                } catch (err) {
                    console.error("❌ loginStateController error:", err);

                    // safe fallback
                    if (cdaBtnDelete) cdaBtnDelete.innerText = "Login";

                } finally {
                    // ✅ always re-enable
                    if (cdaBtnDelete) cdaBtnDelete.disabled = false;
                }
            }

            // =========================================================
            // Spinner
            // =========================================================

            function showSpinner() {
                const statusDiv = document.getElementById("status-6");
                if (!statusDiv) return;

                // prevent duplicate spinner
                if (document.getElementById("loadingSpinner")) return;

                const spinner = document.createElement("img");

                spinner.src = `${documentRoot}/mvs/cwms-data-upload/images/loading2.gif`;

                spinner.id = "loadingSpinner";
                spinner.className = "loading-spinner";

                statusDiv.appendChild(spinner);
            }

            function hideSpinner() {
                const spinner = document.getElementById("loadingSpinner");
                if (spinner) spinner.remove();
            }

            function setStatus(text) {
                const msg = document.getElementById("statusMsg-6");
                if (msg) msg.textContent = text ?? "";
            }

            function addStatus(text) {
                const msg = document.getElementById("statusMsg-6");
                if (!msg) return;
                const t = (text ?? "").toString();
                msg.textContent += (msg.textContent ? "\n" : "") + t;
            }

            loginStateController();

            setInterval(async () => {
                loginStateController();
            }, 10000);

            cdaBtnDelete.onclick = async () => {

                // =========================================================
                // Login path
                // =========================================================
                if (cdaBtnDelete.innerText === "Login") {
                    showSpinner();
                    try {
                        const loginResult = await loginCDA();

                        cdaBtnDelete.innerText = loginResult ? "Submit" : "Login";
                        setStatus(loginResult ? "" : "Failed to Login!");

                    } catch (err) {
                        console.error(err);
                        setStatus("Failed to Login!");
                        cdaBtnDelete.innerText = "Login";

                    } finally {
                        hideSpinner();
                    }

                    return;
                }

                console.log("[DELETE BTN] Clicked delete button");

                async function deleteTS(tsid, beginTimeISO, endTimeISO) {

                    console.log("[DELETE TS] Starting deleteTS()");
                    console.log("[DELETE TS] tsid:", tsid);

                    if (!tsid) {
                        console.error("[DELETE TS] Missing tsid");
                        throw new Error("You must specify a tsid!");
                    }

                    const url = `${setBaseUrl}/timeseries/${tsid}?office=${office}&begin=${beginTimeISO}&end=${endTimeISO}&start-time-inclusive=true&end-time-inclusive=true&override-protection=true`;

                    console.log("[DELETE TS] Request URL:", url);
                    console.log("[DELETE TS] Sending DELETE request...");

                    let response;

                    try {
                        response = await fetch(url, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json;version=2"
                            },
                            body: JSON.stringify(tsid)
                        });

                        console.log("[DELETE TS] Response received");
                        console.log("[DELETE TS] Status:", response.status);
                        console.log("[DELETE TS] OK:", response.ok);

                    } catch (err) {
                        console.error("[DELETE TS] Network/fetch error:", err);
                        throw err;
                    }

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error("[DELETE TS] API error response:", errorText);
                        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                    }

                    console.log("[DELETE TS] Delete successful for:", tsid);
                }

                try {

                    const rows = getFilteredTableData();

                    console.log("Rows to delete:", rows);

                    const beginTime = rows[1][2];
                    const lastRowIndex = rows.length - 1;
                    const endTime = rows[lastRowIndex][2];

                    const beginTimeISO = new Date(beginTime).toISOString();
                    const endTimeISO = new Date(endTime).toISOString();

                    // -----------------------------
                    // STATUS CONTAINER
                    // -----------------------------
                    let statusContainer = document.getElementById("statusContainer");

                    if (!statusContainer) {
                        statusContainer = document.createElement("div");
                        statusContainer.id = "statusContainer";
                        output1Div.appendChild(statusContainer);
                    }

                    // -----------------------------
                    // DELETE STATUS
                    // -----------------------------
                    let deleteStatusDiv = document.getElementById("deleteStatusDiv");

                    if (!deleteStatusDiv) {
                        deleteStatusDiv = document.createElement("div");
                        deleteStatusDiv.id = "deleteStatusDiv";
                        deleteStatusDiv.style.marginTop = "10px";
                        deleteStatusDiv.style.padding = "8px";
                        deleteStatusDiv.style.border = "1px solid #ccc";
                        deleteStatusDiv.style.borderRadius = "4px";

                        statusContainer.appendChild(deleteStatusDiv);
                    }

                    deleteStatusDiv.innerHTML = "Deleting data...";
                    deleteStatusDiv.style.backgroundColor = "#fff3cd";

                    console.log("[DELETE BTN] Calling deleteTS...");

                    await deleteTS(
                        tsid,
                        beginTimeISO,
                        endTimeISO
                    );

                    console.log("[DELETE BTN] Completed successfully");

                    deleteStatusDiv.innerHTML =
                        `✅ Delete completed.<br>
                        Begin: ${beginTimeISO}<br>
                        End: ${endTimeISO}`;
                    deleteStatusDiv.style.backgroundColor = "#d4edda";

                } catch (err) {

                    console.error("[DELETE BTN] Delete operation failed:", err);

                    let deleteStatusDiv = document.getElementById("deleteStatusDiv");

                    if (deleteStatusDiv) {
                        deleteStatusDiv.innerHTML =
                            `❌ Delete failed.<br>${err.message}`;
                        deleteStatusDiv.style.backgroundColor = "#f8d7da";
                    }
                }
            };
        }

        function excelSerialToLocalDate(serial) {
            // Excel thinks 1899-12-30 is day 0
            const base = new Date(1899, 11, 30);

            const ms = serial * 86400000;

            // create a UTC date first
            const utc = new Date(base.getTime() + ms);

            // convert UTC → local by rebuilding using local components
            return new Date(
                utc.getUTCFullYear(),
                utc.getUTCMonth(),
                utc.getUTCDate(),
                utc.getUTCHours(),
                utc.getUTCMinutes(),
                utc.getUTCSeconds()
            );
        }

        function getFilteredTableData() {

            const selectedMode = filterSelect.value;

            const filteredData = [];

            Array.from(table.rows).forEach((row, index) => {

                const isMatched =
                    row.classList.contains("matched-row");

                // Header row always included
                if (index === 0) {

                    const headerRow = Array.from(row.cells)
                        .map(cell => cell.textContent);

                    filteredData.push(headerRow);

                    return;
                }

                let includeRow = false;

                switch (selectedMode) {

                    case "all":
                        includeRow = true;
                        break;

                    case "matched":
                        includeRow = isMatched;
                        break;

                    case "nonmatched":
                        includeRow = !isMatched;
                        break;
                }

                if (includeRow) {

                    const rowData = Array.from(row.cells)
                        .map(cell => cell.textContent);

                    filteredData.push(rowData);
                }
            });

            return filteredData;
        }
    }
});