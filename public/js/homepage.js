let cards = document.getElementsByClassName("card");

for (card of cards){
    card.addEventListener("click", function (event) {
        let element = event.target.matches(".card") ? event.target : event.target.matches(".container") ? event.target.parentElement : event.target.parentElement.parentElement;
        console.log(element.getAttribute("data-id"))
        window.location.href = `/post/${element.getAttribute("data-id")}`
    })
}

