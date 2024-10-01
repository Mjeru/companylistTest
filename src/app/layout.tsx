import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import { ModalProvider } from '@/components/providers/modal-provider'
import theme from '@/theme'
import { ThemeProvider } from '@mui/material/styles'

export const metadata: Metadata = {
	title: 'Create Next App',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<AppRouterCacheProvider>
					<ModalProvider />
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
