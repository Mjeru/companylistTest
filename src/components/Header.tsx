import { Box } from '@mui/material'

export const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			sx={{
				width: '100%',
				p: '20px',

				bgcolor: '#1976d2',
			}}
		>
			{children}
		</Box>
	)
}
