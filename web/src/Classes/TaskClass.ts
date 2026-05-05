
export default class Task {
    id: number;
    name: string;
    date_created: Date;
    is_completed: boolean;

    constructor(id: number, name: string, date_created: Date, is_completed: boolean) {
        this.id = id;
        this.name = name;
        this.date_created = new Date(date_created);
        this.is_completed = is_completed;
    }
}