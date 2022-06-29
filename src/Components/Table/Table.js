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
    { field: "Person_Location", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "match_count", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "time_taken", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "miles_travelled", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "fuel_used", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "number_vehicles", cellStyle: { "border-color": "#e2e2e2" } },
    { field: "registration_id", cellStyle: { "border-color": "#e2e2e2" } },
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
    if (res.remove) {
      res.remove.forEach(function (rowNode) {
        console.log("Removed Row Node", rowNode);
      });
    }
  
  };
  const onRemoveSelected = useCallback(() => {
    var selectedRowData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedRowData });
  }, []);


  return (
    <div className="">
      <h1 className="my-5 text-5xl font-bold text-center text-white">Books Spreadsheets</h1>
      <div className="ag-theme-alpine mx-auto lg:w-[1000px] lg:h-[500px] md:w-[700px] md:h-[400px] w-[400px] h-[200px]">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          popupParent={popupParent}
          suppressExcelExport={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
      <div className="flex justify-center mx-auto">
        <div className="">
          <button
            className="btn  m-5 p-2 bg-white border mx-3"
            onClick={() => addItems(undefined)}
          >
            Add Items
          </button>
        </div>

        <div className="">
          <button
            className="btn mx-auto m-5 p-2  bg-white border mr-3"
            onClick={onRemoveSelected}
          >
            Remove Selected
          </button>
        </div>
        <div className="">
          <button onClick={onBtnExport} className="btn mx-auto m-5 p-2  bg-white border">
            <div className="flex">
              <div className="">
                <span>
                  <img
                    className="w-5 h-5 mr-1 mt-1"
                    src="https://mpng.subpng.com/20190107/pyb/kisspng-scalable-vector-graphics-computer-icons-clip-art-p-asap-tangampcompany-5c335dab209568.8136441115468701871335.jpg"
                    alt=""
                  />
                </span>
              </div>
              <div className="">Generate</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );


};

export default Table;
