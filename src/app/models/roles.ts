export class Selection {

    public id: string;
    public description: string;

    public static roles: Array<Selection> = [
        {id: 'USER', description:'Utilisateur'},
        {id: 'ADMIN', description:'Administrateur'},
    ]

}