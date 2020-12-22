export class Utilisateur {
  constructor(
    public pseudo: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public motDePasse: string,
    public telephone: string,
    public rue: string,
    public codePostal: string,
    public ville: string,
    // 100 pts lors inscription
    public credit: number,
    // vente en cours = true; pas de vente en cours = false
    public vendeur: boolean,
    // enchères en cours = true; pas d'enchères en cours = false
    public encherisseur: boolean
  ) {}
}
