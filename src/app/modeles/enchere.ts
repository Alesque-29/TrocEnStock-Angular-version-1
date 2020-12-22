export class Enchere {

    constructor(
        public id: number,
        public idArticleVendu: number,
        public dateEnchere: any,
        public proposition: number,
        public prixVente: number,
        public encherisseur: string,
        // enchère terminée = true ; enchère encore en cours = false
        public etatEnchere: boolean
    ) { }

}
