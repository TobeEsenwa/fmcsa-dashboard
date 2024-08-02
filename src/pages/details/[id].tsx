import {useRouter} from 'next/router';
import {useTableData} from '@/hooks/useTableData';
import {ArrowLeftIcon, PhoneIcon, MapPinIcon, TruckIcon, IdentificationIcon} from '@heroicons/react/24/outline';
import {Skeleton} from '@mui/material';
import React from 'react';

const DetailsPage: React.FC = () => {
	const router = useRouter();
	const {id} = router.query;
	const tableData = useTableData('/FMCSA_records.csv');

	const data = tableData?.data.find(item => item['id'] === id);

	if (!tableData || !tableData.data) {
		return (
			<div className="bg-background">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<Skeleton
						variant="text"
						height={60}
						animation="pulse"
					/>

					<Skeleton
						variant="text"
						height={60}
						animation="pulse"
					/>

					<div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Skeleton
							variant="text"
							height={160}
							animation="pulse"
						/>

						<Skeleton
							variant="text"
							height={160}
							animation="pulse"
						/>

						<Skeleton
							variant="text"
							height={160}
							animation="pulse"
						/>
					</div>

					<div>
						<Skeleton
							variant="text"
							height={360}
							animation="pulse"
						/>
					</div>
					</div>
			</div>
		)
	} else {
		return (
			<div className="bg-background">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<button
						onClick={() => router.back()}
						className="flex items-center text-[#86a8e7] hover:text-indigo-800 transition duration-150 ease-in-out mb-8"
					>
						<ArrowLeftIcon className="h-5 w-5 mr-2" />
						Back to list
					</button>

					<div className=" overflow-hidden">
						<div className="px-6 py-2 border-b border-gray-300">
							<h1 className="text-3xl font-bold text-color">{data['legal_name']}</h1>
							<h3 className="mt-2 text-sm text-gray-500 font-medium">{data['dba_name']}</h3>
						</div>

						<div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<InfoCard
								icon={<IdentificationIcon className="h-6 w-6 text-indigo-600" />}
								title="USDOT Information"
								items={[
									{label: 'USDOT Number', value: data['usdot_number']},
									{label: 'Status', value: data['record_status']},
									{label: 'Entity Type', value: data['entity_type']},
								]}
							/>

							<InfoCard
								icon={<TruckIcon className="h-6 w-6 text-green-600" />}
								title="Fleet Information"
								items={[
									{label: 'Power Units', value: data['power_units']},
									{label: 'Drivers', value: data['drivers']},
									{label: 'MCS-150 Mileage', value: data['mcs-150_mileage_(year)']},
								]}
							/>

							<InfoCard
								icon={<MapPinIcon className="h-6 w-6 text-red-600" />}
								title="Contact Information"
								items={[
									{label: 'Phone', value: data['phone']},
									{label: 'Address', value: data['physical_address']},
									{label: 'DUNS Number', value: data['duns_number']},
								]}
							/>
						</div>

						<div className="px-6 py-8 container-class rounded shadow-md">
							<h2 className="text-xl font-semibold container-class mb-4">Additional Details</h2>
							<dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
								<DetailItem
									label="MC/MX/FF Number(s)"
									value={data['mc_mx_ff_number']}
								/>
								<DetailItem
									label="State Carrier ID"
									value={data['state_carrier_id_number']}
								/>
								<DetailItem
									label="MCS-150 Form Date"
									value={data['mcs_150_form_date']}
								/>
								<DetailItem
									label="Out of Service Date"
									value={data['out_of_service_date']}
								/>
								<DetailItem
									label="Operating Authority Status"
									value={data['operating_authority_status']}
								/>
								<DetailItem
									label="Mailing Address"
									value={data['mailing_address']}
								/>
							</dl>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, items: { label: string, value: string }[] }> = (
	{
		icon,
		title,
		items
	}) => (
	<div className="container-class rounded-lg p-6 shadow-md">
		<div className="flex items-center mb-4">
			{icon}
			<h2 className="ml-3 text-lg font-semibold text-grey-600">{title}</h2>
		</div>
		<dl className="space-y-2">
			{items.map((item, index) => (
				<div
					key={index}
					className="flex justify-between"
				>
					<dt className="text-sm font-semibold text-gray-500">{item.label}</dt>
					<dd className="text-sm container-class font-medium">{item.value || 'N/A'}</dd>
				</div>
			))}
		</dl>
	</div>
);

const DetailItem: React.FC<{ label: string, value: string }> = ({label, value}) => (
	<div>
		<dt className="text-sm font-medium text-gray-500">{label}</dt>
		<dd className="mt-1 text-sm font-medium container-class">{value || 'N/A'}</dd>
	</div>
);

export default DetailsPage;