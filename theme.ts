import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#8040ee',
		},
		background: {
			default: '#fff',
			paper: '#1a1a1a',
		},
		text: {
			primary: '#121111',
			secondary: '#fff',
		},
	},
	components: {
		MuiTable: {
			styleOverrides: {
				root: {
					'& th, & td': {
						padding: '16px',
						borderBottom: '1px solid #e5e7eb',
					},
					'& th': {
						backgroundColor: '#f3f4f6',
						textAlign: 'left',
						textTransform: 'uppercase',
						fontSize: '0.75rem',
						fontWeight: '500',
						color: '#6b7280',
					},
					'& td': {
						fontSize: '0.875rem',
						color: '#374151',
					},
					'& tr:nth-of-type(even)': {
						backgroundColor: '#f9fafb',
					},
					'& tr:hover': {
						backgroundColor: '#f1f5f9',
					},
				},
			},
		},
		MuiTablePagination: {
			styleOverrides: {
				root: {
					'& .MuiPaginationItem-root': {
						margin: '0 8px',
						padding: '4px 12px',
						borderRadius: '4px',
						borderColor: '#e5e7eb',
						'&.Mui-selected': {
							backgroundColor: '#8040ee',
							color: '#fff',
						},
					},
				},
			},
		},
	},
});

export default theme;
