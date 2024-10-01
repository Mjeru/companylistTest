export declare global {
	interface Employee {
		id: string
		name: string
		position: string
		department: string
		companyId: string
	}
	interface Company {
		id: string
		name: string
		address?: string
		phone?: string
		email?: string
		employees: Employee[]
	}
}
