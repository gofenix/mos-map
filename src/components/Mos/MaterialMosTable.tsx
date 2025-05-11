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

// 定义所有可用列
const allColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    minSize: 30, // 最小宽度
    maxSize: 80, // 最大宽度
  }),
  columnHelper.accessor("Species", {
    header: "Species",
    minSize: 100, // 最小宽度
  }),
  columnHelper.accessor("Year", {
    header: "Year",
    minSize: 60, // 最小宽度
    maxSize: 100, // 最大宽度
  }),
  columnHelper.accessor("L1-Country", {
    header: "L1",
    minSize: 80, // 最小宽度
    maxSize: 120, // 最大宽度
  }),
  columnHelper.accessor("L2-Province/state", {
    header: "L2",
    minSize: 80, // 最小宽度
    maxSize: 120, // 最大宽度
  }),
  columnHelper.accessor("L3-City", {
    header: "L3-City",
    minSize: 80, // 最小宽度
  }),
  columnHelper.accessor("L4-District", {
    header: "L4-District",
    minSize: 80, // 最小宽度
  }),
  columnHelper.accessor("Location", {
    header: "Location",
    minSize: 100, // 最小宽度
  }),
  columnHelper.accessor("Lat", {
    header: "Lat",
    minSize: 60, // 最小宽度
    maxSize: 100, // 最大宽度
  }),
  columnHelper.accessor("Long", {
    header: "Long",
    minSize: 60, // 最小宽度
    maxSize: 100, // 最大宽度
  }),
  columnHelper.accessor("SourceType", {
    header: "SourceType",
    minSize: 80, // 最小宽度
  }),
  columnHelper.accessor("Journal", {
    header: "Journal",
    minSize: 100, // 最小宽度
  }),
  columnHelper.accessor("Title", {
    header: "Title",
    minSize: 100, // 最小宽度
  }),
  columnHelper.accessor("PMID", {
    header: "PMID",
    minSize: 60, // 最小宽度
    maxSize: 100, // 最大宽度
  }),
  columnHelper.accessor("Note", {
    header: "Note",
    minSize: 80, // 最小宽度
  }),
];

// 默认显示的列
const defaultVisibleColumns = [
  "Species",
  "Year",
  "L1-Country",
  "L2-Province/state",
  "Lat",
  "Long",
  "Journal",
  "PMID",
];

// 根据默认可见列过滤和排序列
const columns = allColumns
  .filter((column) => {
    // 如果列的accessor是id，总是显示它
    if (column.accessorKey === "id") return true;
    // 否则，检查列是否在默认可见列列表中
    return defaultVisibleColumns.includes(column.accessorKey as string);
  })
  // 根据defaultVisibleColumns中的顺序排序列
  .sort((a, b) => {
    // id列总是第一位
    if (a.accessorKey === "id") return -1;
    if (b.accessorKey === "id") return 1;

    const aIndex = defaultVisibleColumns.indexOf(a.accessorKey as string);
    const bIndex = defaultVisibleColumns.indexOf(b.accessorKey as string);
    
    return aIndex - bIndex;
  });

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
    enableColumnResizing: true,
    enableHiding: true,
    enableColumnOrdering: true,
    layoutMode: "grid-no-grow", // 网格模式，列不需要扩展填满可用空间
    muiTablePaperProps: {
      sx: { overflow: "auto" }, // 设置滚动条
    },
    enableColumnActions: true,
    defaultDisplayColumn: { enableResizing: true },
    // 强化搜索功能
    enableGlobalFilter: true,
    enableGlobalFilterRankedResults: true,
    enableStickyHeader: true,
    positionGlobalFilter: "left", // 将搜索框放在左侧
    muiSearchTextFieldProps: {
      placeholder: "搜索所有列... / Search all columns...",
      sx: { minWidth: "300px" },
      variant: "outlined",
      size: "small",
      InputProps: {
        startAdornment: (
          <span className="material-icons" style={{ marginRight: "8px" }}>
            search
          </span>
        ),
      },
    },
    initialState: {
      columnVisibility: Object.fromEntries(
        allColumns
          .filter(column => !defaultVisibleColumns.includes(column.accessorKey as string) && column.accessorKey !== "id")
          .map(column => [column.accessorKey, false])
      ),
      density: "compact",
      pagination: {
        pageSize: 100,
        pageIndex: 0,
      },
    },
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
