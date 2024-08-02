import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
	return (
		<header className="glass-effect text-white p-6 shadow-lg mb-8">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-3xl font-bold neon-text">My SPA</h1>
				<nav>
					<ul className="flex space-x-6">
						{['Home', 'About', 'Contact'].map((item) => (
							<li key={item}>
								<Link href="#" className="hover:text-cyan-400 transition-colors duration-300 text-lg">
									{item}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;