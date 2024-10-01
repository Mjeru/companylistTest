import { useModal } from '@/hooks/use-modal-store'
import { useStorage } from '@/hooks/use-storage'
import { localStorageService } from '@/utils/storage'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'

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

export const EditCompanyModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const { updateCompanies } = useStorage()
	if (!(isOpen && type === 'editCompany' && data)) return null
	const handleClose = () => {
		onClose()
	}

	const handleSubmit = (values: Omit<Company, 'employees'>) => {
		setTimeout(() => {
			const newCompanies = localStorageService.editCompany({
				...values,
			})
			updateCompanies(newCompanies)
			onClose()
		}, 400)
	}
	const initialValues: Omit<Company, 'id' | 'employees'> = {
		name: data.name,
		address: (data as Company).address || '',
		phone: (data as Company).phone || '',
		email: (data as Company).email,
	}

	return (
		<div>
			<Modal open={isOpen} onClose={handleClose}>
				<Box sx={{ ...style }}>
					<Formik
						initialValues={initialValues}
						validate={values => {
							const errors: { email?: string; name?: string } = {}
							if (
								values.email &&
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = 'Некорректный email'
							}
							if (!values.name) {
								errors.name = 'Название обязательно'
							}

							return errors
						}}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit({ ...values, id: data.id })
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
							/* and other goodies */
						}) => (
							<Form onSubmit={handleSubmit}>
								<Stack direction='column' spacing={2}>
									<Typography variant='h5' color='text.primary' align='center'>
										Редактировать компанию
									</Typography>
									<TextField
										fullWidth
										type='text'
										name='name'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										label='Название компании'
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
									/>
									<TextField
										fullWidth
										type='text'
										name='address'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.address}
										label='Адрес'
									/>

									<TextField
										fullWidth
										type='text'
										name='email'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										autoComplete={'email'}
										label='Email'
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
									/>

									<TextField
										fullWidth
										type='text'
										name='phone'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.phone}
										autoComplete={'email'}
										label='Телефон'
									/>
									{errors.phone && touched.phone && errors.phone}

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
