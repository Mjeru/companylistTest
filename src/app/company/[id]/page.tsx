'use client'
import { useModal } from '@/hooks/use-modal-store'
import { useStorage } from '@/hooks/use-storage'
import { localStorageService } from '@/utils/storage'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
	Box,
	Button,
	Link as MuiLink,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
	const [isLoading, setIsLoading] = useState(true)
	const params = useParams()
	const { companies, updateCompanies } = useStorage()
	const [company, setCompany] = useState<Company | null>(null)
	const { onOpen } = useModal()

	useEffect(() => {
		updateCompanies(localStorageService.getCompanies())
	}, [updateCompanies])

	useEffect(() => {
		const company = companies.find(
			(company: Company) => company.id === params.id
		)
		if (company) {
			setCompany(company)
			setIsLoading(false)
		}
	}, [params.id, companies])

	if (isLoading) {
		return (
			<>
				<Link href='/'>К списку компаний</Link>
				<Typography variant='h5' sx={{ mb: 2 }}>
					Загрузка...
				</Typography>
			</>
		)
	}

	const renderEmployees = () => {
		return company?.employees.map((employee, i) => (
			<TableRow key={employee.id}>
				<TableCell>{i + 1}</TableCell>
				<TableCell>{employee.name}</TableCell>
				<TableCell>{employee.department}</TableCell>
				<TableCell>{employee.position}</TableCell>
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
							onClick={() => onOpen('editEmployee', employee)}
						>
							<EditIcon />
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={() => onOpen('deleteEmployee', employee)}
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
			<Link href='/'>
				<MuiLink>К списку компаний</MuiLink>
			</Link>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Список сотрудников компании {`'${company?.name}'`}
			</Typography>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Имя</TableCell>
						<TableCell>Должность</TableCell>
						<TableCell>Отдел</TableCell>
						<TableCell sx={{ width: '200px' }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{renderEmployees()}
					<TableRow>
						<TableCell colSpan={5} align='center' sx={{ border: 'none' }}>
							<Button
								onClick={() => onOpen('addEmployee')}
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
