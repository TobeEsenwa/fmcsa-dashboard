import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>FMCSA</title>
			</Head>
			<main>
				<ThemeProvider>
					<Component {...pageProps} />
				</ThemeProvider>
			</main>
		</>
	)
}

export default App
