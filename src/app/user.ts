export class User {
    constructor( 
        public firstName : string,
        public lastName : string,
        public telephone : string,
        public email : string,
        public username : string,
        public password : string,
        public verified : boolean,
        public userId? : number){}
}
