export class Experience {
    date: Date;
    title: string
    desc: string;

    constructor(date: Date, title: string, desc: string) {
        this.date = date;
        this.title = title;
        this.desc = desc;
    }
}