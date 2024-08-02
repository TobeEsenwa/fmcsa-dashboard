import React, {useState} from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	useTheme,
	styled,
	TableSortLabel,
	TextField,
	Skeleton,
} from '@mui/material';
import {useRouter} from 'next/router';

interface TableProps {
	data: any[];
	columns: string[];
	itemsPerPage: number;
}

const StyledTableContainer = styled(TableContainer)(({theme}) => ({
	maxHeight: 440,
	boxShadow: theme.shadows[1], // Reduced shadow
	overflow: 'auto', // Ensure scrolling is enabled
	/* Hide scrollbar */
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	'-ms-overflow-style': 'none',  /* IE and Edge */
	'scrollbar-width': 'none',  /* Firefox */
}));

const StyledTableHead = styled(TableHead)(({theme}) => ({
	backgroundColor: theme.palette.primary.light,
}));

const StyledTableCellHead = styled(TableCell)(({theme}) => ({
	color: theme.palette.common.white,
	fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
	backgroundColor: theme.palette.background.paper,
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	'&:hover': {
		boxShadow: theme.shadows[0], // Reduced shadow on hover
		backgroundColor: theme.palette.action.hover,
	},
}));

const CustomTableSortLabel = styled(TableSortLabel)(({theme}) => ({
	color: 'inherit', // Inherit color from parent
	'&:hover': {
		textDecoration: 'underline', // Underline on hover
	},
	'&.Mui-active': {
		textDecoration: 'underline', // Underline when active
	},
	'& .MuiTableSortLabel-icon': {
		color: 'inherit !important', // Prevent color change on icon
	},
}));

const StyledTableBody = styled(TableBody)(({theme}) => ({
	/* Hide scrollbar */
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	'-ms-overflow-style': 'none',  /* IE and Edge */
	'scrollbar-width': 'none',  /* Firefox */
}));

const formatDateTime = (dateString: string) => {
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString;

	const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'short', year: 'numeric'};
	const timeOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false};

	return (
		<>
			<div>{date.toLocaleDateString(undefined, options)}</div>
			<div>{date.toLocaleTimeString(undefined, timeOptions)}</div>
		</>
	);
};

const FMCSATable = ({data, columns, itemsPerPage}: TableProps) => {
	const theme = useTheme();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage || 5);
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [filters, setFilters] = useState<{ [key: string]: string }>({});

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const router = useRouter();

	const handleRowClick = (row: any) => {
		router.push(`details/${row.id}`);
	};

	const handleSort = (column: string) => {
		const isAsc = sortColumn === column && sortDirection === 'asc';
		setSortDirection(isAsc ? 'desc' : 'asc');
		setSortColumn(column);
	};

	const handleFilterChange = (column: string, value: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[column]: value,
		}));
	};

	const applyFilters = (data: any[]) => {
		return data.filter((row) =>
			columns.every((column) =>
				row[column]?.toString().toLowerCase().includes(filters[column]?.toLowerCase() || '')
			)
		);
	};

	const applySort = (data: any[]) => {
		if (!sortColumn) return data;

		return data.sort((a, b) => {
			if (a[sortColumn] < b[sortColumn]) {
				return sortDirection === 'asc' ? -1 : 1;
			}
			if (a[sortColumn] > b[sortColumn]) {
				return sortDirection === 'asc' ? 1 : -1;
			}
			return 0;
		});
	};

	const isFaultyValue = (value: any) => value === undefined || value === null || value === '';

	const getDisplayValue = (value: any) => isFaultyValue(value) ? 'N/A' : value;

	const filteredData = applyFilters(data);
	const sortedData = applySort(filteredData);

	if (!data || data.length === 0) {
		return (
			<div className="h-full">
				<Skeleton
					style={{
						margin: "1px",
						display: 'flex',
						height: '500px'
					}}
					variant="rectangular"
					animation="pulse"
				/>
			</div>
		);
	} else {
		return (
			<Paper sx={{borderRadius: 2, overflow: 'hidden', boxShadow: 1}}>
				<StyledTableContainer>
					<Table stickyHeader>
						<StyledTableHead>
							<TableRow>
								{columns.map((column) => (
									<StyledTableCellHead key={column}>
										<CustomTableSortLabel
											active={sortColumn === column}
											direction={sortColumn === column ? sortDirection : 'asc'}
											onClick={() => handleSort(column)}
										>
											{column.charAt(0).toUpperCase() + column.slice(1)}
										</CustomTableSortLabel>
										<TextField
											value={filters[column] || ''}
											onChange={(e) => handleFilterChange(column, e.target.value)}
											placeholder={`Filter by ${column}`}
											variant="standard"
											size="small"
											fullWidth
										/>
									</StyledTableCellHead>
								))}
							</TableRow>
						</StyledTableHead>
						<StyledTableBody>
							{sortedData
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => (
									<StyledTableRow
										key={index}
										onClick={() => handleRowClick(row)}
										sx={{
											cursor: 'pointer',
											'&:hover': {backgroundColor: theme.palette.action.hover}
										}}
									>
										{columns.map((column) => (
											<TableCell key={column}>
												{(column.toLowerCase().includes('created_dt') || column.toLowerCase().includes('data_source_modified_dt')) && row[column]
													? formatDateTime(row[column])
													: getDisplayValue(row[column])
												}
											</TableCell>
										))}
									</StyledTableRow>
								))}
						</StyledTableBody>
					</Table>
				</StyledTableContainer>
				<TablePagination
					rowsPerPageOptions={[130, 150, 175, 200, 300]}
					component="div"
					count={filteredData.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{
						padding: theme.spacing(2),
						backgroundColor: '#86a8e7',
						color: theme.palette.common.white,
						'.MuiTablePagination-selectIcon': {
							color: theme.palette.common.white,
						},
						'.MuiTablePagination-actions': {
							color: theme.palette.common.white,
						},
					}}
				/>
			</Paper>
		);
	}
};

export default FMCSATable;
