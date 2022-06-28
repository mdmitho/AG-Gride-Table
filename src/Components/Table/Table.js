import React, { useCallback, useMemo, useRef, useState } from "react";
import "./Table";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import './Table.css'

const Table = () => {
    const gridRef = useRef();
    const popupParent = useMemo(() => {
      return document.body;
    }, []);
  const [columnDefs, setColumnDefs] = useState([
    { field: "Person_Location" },
    { field: "match_count" },
    { field: "time_taken" },
    { field: "miles_travelled" },
    { field: "fuel_used" },
    { field: "number_vehicles" },
    { field: "registration_id" },
  ]);
  const [rowData, setRowData] = useState([
    {
      Person_Location: "Toyota",
      match_count: "Celica",
      miles_travelled: 35000,
      number_vehicles: 35000,
      fuel_used: 35000,
      registration_id: 35000,
      time_taken: 35000,
    },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);
  return (
    <div className="container mx-auto">
      <h1>This is table</h1>
      <div className="ag-theme-alpine mx-auto" style={{ width: 1100, height: 400 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          popupParent={popupParent}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};

export default Table;
