
export default class Task {
    name: string;
    date_created: Date;
    is_completed: boolean;

    constructor(name: string, date_created: Date, is_completed: boolean) {
        this.name = name;
        this.date_created = date_created;
        this.is_completed = is_completed;
    }
}