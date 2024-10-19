"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
// import { data, type Person } from "./makeData";
import { type Mos } from "@/types/mos";

const columnHelper = createMRTColumnHelper<Mos>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 40,
  }),
  columnHelper.accessor("Species", {
    header: "Species",
    size: 120,
  }),
  columnHelper.accessor("Year", {
    header: "Year",
    size: 120,
  }),
  columnHelper.accessor("L1-Country", {
    header: "L1-Country",
    size: 300,
  }),
  columnHelper.accessor("L2-Province/state", {
    header: "L2-Province/state",
  }),
  columnHelper.accessor("L2-Province/state", {
    header: "L2-Province/state",
    size: 220,
  }),
  columnHelper.accessor("L3-City", {
    header: "L3-City",
    size: 220,
  }),
  columnHelper.accessor("L4-District", {
    header: "L4-District",
    size: 220,
  }),
  columnHelper.accessor("Location", {
    header: "Location",
    size: 300,
  }),
  columnHelper.accessor("Lat", {
    header: "Lat",
    size: 120,
  }),
  columnHelper.accessor("Long", {
    header: "Long",
    size: 120,
  }),
  columnHelper.accessor("SourceType", {
    header: "SourceType",
    size: 120,
  }),
  columnHelper.accessor("Journal", {
    header: "Journal",
    size: 120,
  }),
  columnHelper.accessor("Title", {
    header: "Title",
    size: 120,
  }),
  columnHelper.accessor("PMID", {
    header: "PMID",
    size: 120,
  }),
  columnHelper.accessor("Note", {
    header: "Note",
    size: 120,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

interface MosTableProps {
  data: Mos[];
}

const MaterialTable = ({ data }: MosTableProps) => {
  const handleExportRows = (rows: MRT_Row<Mos>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <div className="-mt-16 p-16">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default MaterialTable;
