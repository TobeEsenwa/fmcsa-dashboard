export interface FMCSADataType {
	Created_DT: string
	Modifed_DT: string
	Entity: string
	Operating_status: string
	Legal_name: string
	DBA_name: string
	Physical_address: string
	Phone: string
	DOT: string
	MC_MX_FF: string
	Power_units: string
	Out_of_service_date: string
}

export interface FMCSATableProps {
	data: FMCSADataType[]
}