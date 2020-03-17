export class AccountService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    onAddAccount(name: string, status: string) {
        this.accounts.push({ name, status });
    }

    onUpdateAccount(id: number, status: string) { 
        this.accounts[id].status = status;
    }

}