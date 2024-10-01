import { useModal } from '@/hooks/use-modal-store'
import { useStorage } from '@/hooks/use-storage'
import { localStorageService } from '@/utils/storage'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useParams } from 'next/navigation'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	minWidth: 320,
	boxShadow: 24,
	p: 4,
}

export const AddEmployeeModal = () => {
	const { isOpen, onClose, type } = useModal()
	const { updateCompanies } = useStorage()
	const params = useParams()
	if (!(isOpen && type === 'addEmployee')) return null
	const handleClose = () => {
		onClose()
	}

	const handleSubmit = (values: Omit<Employee, 'id' | 'companyId'>) => {
		setTimeout(() => {
			const newCompanies = localStorageService.addEmployee({
				...values,
				companyId: params.id as string,
			})
			updateCompanies(newCompanies)
			onClose()
		}, 400)
	}
	const initialValues: Omit<Employee, 'id' | 'companyId'> = {
		name: '',
		position: '',
		department: '',
	}

	return (
		<div>
			<Modal open={isOpen} onClose={handleClose}>
				<Box sx={{ ...style }}>
					<Formik
						initialValues={initialValues}
						validate={values => {
							const errors: {
								position?: string
								name?: string
								department?: string
							} = {}
							if (!values.position) {
								errors.position = 'Должность обязательна'
							}
							if (!values.name) {
								errors.name = 'Название обязательно'
							}
							if (!values.department) {
								errors.department = 'Отдел обязателен'
							}

							return errors
						}}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit(values)
							setTimeout(() => {
								setSubmitting(false)
							}, 400)
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								<Stack direction='column' spacing={2}>
									<Typography variant='h5' color='text.primary' align='center'>
										Добавить сотрудника
									</Typography>
									<TextField
										fullWidth
										type='text'
										name='name'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										label='Имя'
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
									/>
									<TextField
										fullWidth
										type='text'
										name='position'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.position}
										label='Должность'
										error={touched.position && Boolean(errors.position)}
										helperText={touched.position && errors.position}
									/>

									<TextField
										fullWidth
										type='text'
										name='department'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.department}
										label='Отдел'
										error={touched.department && Boolean(errors.department)}
										helperText={touched.department && errors.department}
									/>

									<Button
										fullWidth
										variant='contained'
										type='submit'
										disabled={isSubmitting}
									>
										Готово
									</Button>
								</Stack>
							</Form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	)
}
