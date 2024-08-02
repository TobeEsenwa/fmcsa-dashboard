// hooks/useTableData.ts
import {useEffect, useState} from 'react';
import Papa from 'papaparse';

export interface TableData {
	columns: string[];
	data: any[];
}

const convertCsvToTableData = (csvString: string): TableData => {
	const result = Papa.parse(csvString, {header: true, skipEmptyLines: true});
	const dataWithIds = result.data.map((row: any, index: number) => ({
		...row,
		id: `${index + 1}`,
	}));
	console.log(dataWithIds)

	return {
		columns: [
			'id',
			"created_dt",
			"data_source_modified_dt",
			"entity_type",
			"operating_status",
			"legal_name",
			"dba_name",
			'physical_address',
			'phone',
			"usdot_number",
			"mc_mx_ff_number",
			"power_units",
			"out_of_service_date"
			|| []],
		data: dataWithIds,
	};
};

export const useTableData = (csvFilePath: string) => {
	const [tableData, setTableData] = useState<TableData | null>(null);

	useEffect(() => {
		const fetchTableData = async () => {
			const response = await fetch(csvFilePath);
			const csvString = await response.text();
			const data = convertCsvToTableData(csvString);
			setTableData(data);
		};

		fetchTableData();
	}, [csvFilePath]);

	return tableData;
};
