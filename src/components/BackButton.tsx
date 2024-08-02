import React from "react";
import { useRouter } from "next/router";
import {ArrowLeftIcon} from '@heroicons/react/16/solid';

const BackButton = ({ route }: { route?: string }) => {
	const router = useRouter();

	const goBack = () => {
		if (route) {
			router.push(route);
			return;
		}
		router.back();
	};

	return (
		<button
			className="bg-primary text-start border-[1px] gap-4 text-neutral-400 text-sm font-semibold flex items-center max-w-fit border-[#DEDEDE] hover:bg-primary-300 hover:text-milsat-white hover:shadow-base py-2 px-3.5 rounded-lg"
			onClick={goBack}
		>
			<ArrowLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
			Back
		</button>
	);
};

export default BackButton;
