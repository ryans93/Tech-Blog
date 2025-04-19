let cards = document.getElementsByClassName("card");

for (card of cards){
    card.addEventListener("click", function (event) {
        let element = ""
        if (event.target.matches(".card")){
            element = event.target;
        }
        else if (event.target.matches(".container")){
            element = event.target.parentElement;
        }
        else if (event.target.matches(".card-header-container") || event.target.matches("p")){
            element = event.target.parentElement.parentElement;
        }
        else {
            element = event.target.parentElement.parentElement.parentElement;
        }
        
        console.log(element.getAttribute("data-id"))
        window.location.href = `/post/${element.getAttribute("data-id")}`
    })
}

