export interface Employee {
    employeeId?: string;
    firstName: string;
    lastName: string;
    addresses?: [{
        streetAddress?: string;
        aptNumber?: string;
        city?: string;
        state?: string;
        zipCode?: string;
    }]
}
