'use client'

import { useEffect, useState } from 'react'
import { AddCompanyModal } from '../modals/AddCompanyModal'
import { AddEmployeeModal } from '../modals/AddEmployeeModal'
import { DeleteCompanyModal } from '../modals/DeleteCompanyModal'
import { DeleteEmployeeModal } from '../modals/DeleteEmployeeModal'
import { EditCompanyModal } from '../modals/EditCompanyModal'
import { EditEmployeeModal } from '../modals/EditEmployeeModal'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}
	return (
		<>
			<AddCompanyModal />
			<AddEmployeeModal />
			<EditCompanyModal />
			<DeleteCompanyModal />
			<EditEmployeeModal />
			<DeleteEmployeeModal />
		</>
	)
}
