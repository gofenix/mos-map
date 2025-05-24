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
    header: "L1-Country",
    minSize: 100, // 最小宽度
    maxSize: 150, // 最大宽度
  }),
  columnHelper.accessor("L2-Province/state", {
    header: "L2-Province",
    minSize: 100, // 最小宽度
    maxSize: 150, // 最大宽度
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
    header: "Latitude",
    minSize: 80, // 最小宽度
    maxSize: 120, // 最大宽度
  }),
  columnHelper.accessor("Long", {
    header: "Longitude",
    minSize: 80, // 最小宽度
    maxSize: 120, // 最大宽度
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
// 修改列配置，简化列名并增加宽度
const columnsWithAdjustedHeaders = allColumns.map(column => {
  if (column.accessorKey === "L1-Country") {
    return {
      ...column,
      header: "Country",
      minSize: 120,
    };
  }
  if (column.accessorKey === "L2-Province/state") {
    return {
      ...column,
      header: "Province",
      minSize: 120,
    };
  }
  if (column.accessorKey === "Lat") {
    return {
      ...column,
      header: "Latitude",
      minSize: 100,
    };
  }
  if (column.accessorKey === "Long") {
    return {
      ...column,
      header: "Longitude",
      minSize: 100,
    };
  }
  return column;
});

const columns = columnsWithAdjustedHeaders
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
    // 使用所有可用列，而不是只用过滤后的列
    columns: columnsWithAdjustedHeaders,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    
    // 正确设置列选择功能
    enableColumnActions: true,     // 启用列操作菜单
    enableHiding: true,            // 启用列隐藏/显示功能
    enableColumnOrdering: false,   // 禁用列重排序
    enableDensityToggle: false,    // 禁用密度切换
    enableFullScreenToggle: false, // 禁用全屏切换
    
    // 禁用其他头部功能，保持简洁
    enableColumnFilters: false,    // 禁用列过滤器
    enableSorting: false,          // 禁用排序
    enableColumnDragging: false,   // 禁用列拖动
    enableGrouping: false,         // 禁用分组
    enablePinning: false,          // 禁用列固定
    enableMultiSort: false,        // 禁用多列排序
    enableColumnResizing: true,    // 保留列宽度调整
    layoutMode: "grid",            // 使用网格布局
    muiTablePaperProps: {
      sx: { overflow: "auto" },      // 设置滚动条
    },
    // 定制表头单元格样式
    muiTableHeadCellProps: {
      sx: {
        fontSize: '0.9rem',           // 调整字体大小
        padding: '16px 12px',         // 增加内边距
        whiteSpace: 'nowrap',         // 防止文字换行
        fontWeight: 'bold',           // 加粗字体
        backgroundColor: '#f5f5f5',    // 添加背景色
        borderBottom: '2px solid #ddd' // 增加底部边框
      },
    },
    defaultDisplayColumn: { minSize: 120 }, // 增加默认列宽度
    
    // 列显示切换按钮文本
    localization: {
      toggleVisibility: '选择显示列',
    },
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
