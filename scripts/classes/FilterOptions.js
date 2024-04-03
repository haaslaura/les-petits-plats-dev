export class filterOptions {

    /**
     * 
     * @param {string} searchText 
     * @param {Array} selectedIngredients 
     * @param {Array} selectedAppliances 
     * @param {Array} selectedUstensils 
     */
    constructor (searchText, selectedIngredients, selectedAppliances, selectedUstensils) {
    
        this.searchText = searchText;
        this.selectedIngredients = selectedIngredients;
        this.selectedAppliances = selectedAppliances;
        this.selectedUstensils = selectedUstensils;
    }
}