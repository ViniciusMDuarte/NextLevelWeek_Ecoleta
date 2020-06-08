
function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then ( states => {

        for( const state  of states ) {
            
            ufSelect.innerHTML += `<option value ="${state.id}"> ${state.nome} </option>`

        }
    })
}

populateUfs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

   
   const ufValue = event.target.value;

   const indexOfSelectdState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectdState].text

      


   const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

   citySelect .innerHTML = "<option>Selecione a Cidade</option>"
   citySelect.disabled = true

   fetch(url)
   .then( (res) => { return res.json() })
   .then ( cities => {

       for( const city  of cities ) {
        citySelect .innerHTML += `<option value ="${city.nome}"> ${city.nome} </option>`
       }

       citySelect.disabled = false

   })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    const collectItems = document.querySelector("[name=items]")

    let selectedItems = []


    // itens de coleta
    // pegar todos os lis



    const itemsToCollect= document.querySelectorAll(".items-grid li")

    for(const item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

    function handleSelectedItem(event) {
        const itemLi = event.target

        // adicionar pu remover uma classe com javascript
        itemLi.classList.toggle("selected")

        const itemId = event.target.dataset.id

     
        // verificar se existem itens selecionados, se sim
        // pegar os itens selecionados

        const alreadySelected = selectedItems.findIndex( item => {
            const itemFound = item == itemId // retorna true or falsee
            return itemFound
        })

        // se ja tiver selecionado, tirar da seleção
        if(alreadySelected >= 0 ) {
            const filteredItems = selectedItems.filter( item => {
                const itemIsDiferrent = item != itemId // false
                return itemIsDiferrent
            })

            selectedItems = filteredItems 

        } else {
        // se não tiver selecionado, adiconar à seleção
            selectedItems.push(itemId)
        }
        

        // atualizar o campo escondido com os itens selecionados

        collectItems.value = selectedItems

    }



