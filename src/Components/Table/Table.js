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
      Person_Location: "orig",
      match_count: "671/1000",
      miles_travelled: "54",
      number_vehicles: "3",
      fuel_used: "545",
      registration_id: "32421Gf",
      time_taken: "438.5",
    },
   
    {
      Person_Location: "new",
      match_count: "718/1000",
      miles_travelled: "567",
      number_vehicles: "",
      fuel_used: "31",
      registration_id: "234353T",
      time_taken: "131.1",
    },
   
    {  },
    {  },
    {  },
 
  ]);


  

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
    //   minWidth: 100,
    //   flex: 1,
    };
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const addItems = useCallback((addIndex) => {
    const newItems = [
        createNewRowData(), 
       ];
    const res = gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    printResult(res);
  }, []);
  let newCount = 1;
  const createNewRowData = () => {
    const newData = {
      
    };
    newCount++;
    return newData;
  };

  const printResult = (res) => {
    
    if (res.add) {
      res.add.forEach(function (rowNode) {
        console.log("Added Row Node", rowNode);
      });
    }
   
  
  };


  return (
    <div className="container mx-auto">
      <h1>This is table</h1>
      <div className="ag-theme-alpine mx-auto" style={{ width: 1000, height: 400 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          popupParent={popupParent}
          defaultColDef={defaultColDef}
          suppressExcelExport={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
      <div className="">
        <button
          className="btn mx-auto m-5 p-2  hover:bg-red-400 border"
          onClick={() => addItems(undefined)}
        >
          Add Items
        </button>
        <button onClick={onRemoveSelected}>Remove Selected</button>
        <button onClick={onBtnExport} className="btn mx-auto m-5 p-2  hover:bg-red-400 border">
          Generate
        </button>
      </div>
    </div>
  );


};

export default Table;
