export class ArticleVendu {

    constructor(
        public id: number,
        public nomArticle: string,
        public description: string,
        public categorie: string,
        // public file: File,
        public dateDebutEncheres: any,
        public dateFinEncheres: any,
        public miseAPrix: number,
        public rue: string,
        public codePostal: string,
        public ville: string,
        public vendeur: string,
        // enchères en cours = true; enchères pas commencées = false
        public etatVente: boolean,
        public acquereur: string
    ) { }

}
