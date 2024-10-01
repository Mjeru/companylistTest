import { v4 as uuidv4 } from 'uuid'

class LocalStorageService {
	constructor() {
		if (typeof window !== 'undefined') {
			const companies = localStorage.getItem('companies')
			if (!companies) {
				localStorage.setItem('companies', JSON.stringify([]))
			}
		}
	}

	getCompany(id: string) {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			return parsedCompanies.find((company: Company) => company.id === id)
		}
		return null
	}

	getCompanies() {
		const companies = localStorage.getItem('companies')
		return companies ? JSON.parse(companies) : []
	}

	addCompany(company: Omit<Company, 'id' | 'employees'>): Company[] {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			parsedCompanies.push({ ...company, id: uuidv4(), employees: [] })
			localStorage.setItem('companies', JSON.stringify(parsedCompanies))
			return parsedCompanies
		}
		return []
	}

	editCompany(company: Omit<Company, 'employees'>): Company[] {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			const newCompanies = parsedCompanies.map((c: Company) => {
				if (c.id === company.id) {
					return { ...c, ...company }
				}
				return c
			})
			localStorage.setItem('companies', JSON.stringify(newCompanies))

			return newCompanies
		}
		return []
	}

	deleteCompany(id: string) {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			const newCompanies = parsedCompanies.filter(
				(company: Company) => company.id !== id
			)
			localStorage.setItem('companies', JSON.stringify(newCompanies))
			return newCompanies
		}
		return []
	}

	addEmployee(employee: Omit<Employee, 'id'>) {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			parsedCompanies.forEach((company: Company) => {
				if (company.id === employee.companyId) {
					company.employees.push({ ...employee, id: uuidv4() })
				}
			})
			localStorage.setItem('companies', JSON.stringify(parsedCompanies))
			return parsedCompanies
		}
		return []
	}
	editEmployee(employee: Employee) {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			const newCompanies = parsedCompanies.map((c: Company) => {
				if (c.id === employee.companyId) {
					return {
						...c,
						employees: c.employees.map((e: Employee) => {
							if (e.id === employee.id) {
								return { ...e, ...employee }
							}
							return e
						}),
					}
				}
				return c
			})
			localStorage.setItem('companies', JSON.stringify(newCompanies))
			return newCompanies
		}
		return []
	}
	deleteEmployee(id: string) {
		const companies = localStorage.getItem('companies')
		if (companies) {
			const parsedCompanies = JSON.parse(companies)
			const newCompanies = parsedCompanies.map((c: Company) => {
				return {
					...c,
					employees: c.employees.filter((e: Employee) => e.id !== id),
				}
			})
			localStorage.setItem('companies', JSON.stringify(newCompanies))
			return newCompanies
		}
		return []
	}
}

export const localStorageService = new LocalStorageService()
