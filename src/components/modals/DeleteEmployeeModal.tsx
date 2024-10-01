import { useModal } from '@/hooks/use-modal-store'
import { useStorage } from '@/hooks/use-storage'
import { localStorageService } from '@/utils/storage'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
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

export const DeleteEmployeeModal = () => {
	const { isOpen, onClose, type, data } = useModal()
	const { updateCompanies } = useStorage()
	if (!(isOpen && type === 'deleteEmployee' && data)) return null
	const handleClose = () => {
		onClose()
	}

	const handleSubmit = (values: { id: string }) => {
		setTimeout(() => {
			const newCompanies = localStorageService.deleteEmployee(values.id)
			updateCompanies(newCompanies)
			onClose()
		}, 400)
	}

	return (
		<div>
			<Modal open={isOpen} onClose={handleClose}>
				<Box sx={{ ...style }}>
					<Formik
						initialValues={{}}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit({ id: data.id })
							setTimeout(() => {
								setSubmitting(false)
							}, 400)
						}}
					>
						{({
							handleSubmit,
							isSubmitting,
							/* and other goodies */
						}) => (
							<Form onSubmit={handleSubmit}>
								<Stack direction='column' spacing={2}>
									<Typography variant='h5' color='text.primary' align='center'>
										Удаление сотрудника
									</Typography>
									<Typography
										variant='body1'
										color='text.primary'
										align='center'
									>{`Вы уверены что хотите удалить сотрудника "${data.name}"?`}</Typography>
									<Box sx={{ display: 'flex', gap: 2 }}>
										<Button
											fullWidth
											variant='contained'
											type='submit'
											disabled={isSubmitting}
											color='error'
										>
											Удалить
										</Button>
										<Button
											fullWidth
											variant='contained'
											onClick={() => onClose()}
											disabled={isSubmitting}
										>
											Отмена
										</Button>
									</Box>
								</Stack>
							</Form>
						)}
					</Formik>
				</Box>
			</Modal>
		</div>
	)
}
