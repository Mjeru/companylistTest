import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import { ModalProvider } from '@/components/providers/modal-provider'

import './global.css'

export const metadata: Metadata = {
	title: 'Список компаний',
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
					{children}
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
