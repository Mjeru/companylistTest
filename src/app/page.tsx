'use client'
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'

import { useModal } from '@/hooks/use-modal-store'
import { useStorage } from '@/hooks/use-storage'
import { localStorageService } from '@/utils/storage'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { useEffect } from 'react'

const Companies = () => {
	const { companies, updateCompanies } = useStorage()
	const { onOpen } = useModal()

	useEffect(() => {
		if (!companies.length) {
			updateCompanies(localStorageService.getCompanies())
		}
	}, [updateCompanies])

	const renderCompanies = () => {
		return companies.map((company, i) => (
			<TableRow key={company.id}>
				<TableCell color='primary'>{i + 1}</TableCell>
				<TableCell color='primary'>{company.name}</TableCell>
				<TableCell color='primary'>{company.address}</TableCell>
				<TableCell color='primary'>{company.email}</TableCell>
				<TableCell color='primary'>{company.phone}</TableCell>
				<TableCell color='primary'>
					<Link href={`/company/${company.id}`}>
						<Button variant='contained' color='primary'>
							{company.employees.length}
						</Button>
					</Link>
				</TableCell>
				<TableCell>
					<Box
						sx={{
							display: 'flex',
							gap: 2,
							alignItems: 'center',
							height: '100%',
						}}
					>
						<Button
							variant='contained'
							color='primary'
							onClick={() => onOpen('editCompany', company)}
						>
							<EditIcon />
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={() => onOpen('deleteCompany', company)}
						>
							<DeleteIcon />
						</Button>
					</Box>
				</TableCell>
			</TableRow>
		))
	}

	return (
		<div>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Компании
			</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Название</TableCell>
						<TableCell>Адрес</TableCell>
						<TableCell>E-mail</TableCell>
						<TableCell>Телефон</TableCell>
						<TableCell>Сотрудники</TableCell>
						<TableCell sx={{ width: '200px' }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{renderCompanies()}
					<TableRow>
						<TableCell colSpan={7} align='center' sx={{ border: 'none' }}>
							<Button
								onClick={() => onOpen('addCompany')}
								variant='contained'
								color='primary'
							>
								<AddIcon />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

export default Companies
