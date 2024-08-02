import {ThemeSwitcher} from '@/components/ThemeSwitcher';
import {Toaster} from 'react-hot-toast';
import FMCSATable from '@/components/FMCSATable';
import {Container, Box, IconButton, Tooltip} from '@mui/material';
import {CgInfo} from 'react-icons/cg';
import {useTheme} from 'next-themes';
import {useTableData} from '@/hooks/useTableData';
import React from 'react';

interface TableData {
	columns: string[];
	data: any[];
}

interface HomeProps {
	tableData: TableData;
}

const Home: React.FC<HomeProps> = () => {
	const { theme } = useTheme();
	const tableData = useTableData('/FMCSA_records.csv');

	const buttonStyle =
		theme === 'light' ? 'hover:bg-gray-300 background-black' : 'dark:hover:bg-gray-700 text-white'

	return (
		<>
			<ThemeSwitcher />
			<Container maxWidth="xl">
				<Box
					textAlign="center"
					mt={2}
					mb={2}
				>
					<h1 className="text-7xl font-semibold">
						FMCSA
					</h1>
					<h5 className="text-xl mt-2 font-medium">
						The Federal Motor Carrier Safety Administration
					</h5>
					<Toaster position="top-left" />
				</Box>
				<Box
					mt={1}
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box>
						<Tooltip title="This table displays data from the Federal Motor Carrier Safety Administration records. You can filter, sort, and paginate through the data.">
							<IconButton>
								<CgInfo className={`rounded-full ${buttonStyle}`} />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
				<Box mt={1}>
					<FMCSATable
						data={tableData?.data || []}
						columns={tableData?.columns || []}
						itemsPerPage={100}
						themeColor={theme}
					/>
				</Box>
			</Container>
		</>
	);
};

export default Home;
