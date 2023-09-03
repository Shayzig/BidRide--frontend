export class User {

    constructor(
        public name: string = '',
        public username: string = '',
        public isAdmin: boolean,
        public bids: any,
        public _id: string,
        public coins?: number,
        public moves?: Array<string>,
    ) {

    }

}

