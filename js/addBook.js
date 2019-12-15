window.onload = loadFunction
/**
 * Function to wrap the function as global the 
 * @return a table with data of books 
 */
function loadFunction() {

    document.getElementById('bookSave').addEventListener('click', addBook);

    function addBook() {
        let isbn = document.getElementById("isbn").value
        let bookTitle = document.getElementById("title").value
        let overFee = parseInt(document.getElementById("overdue").value)
        let Publisher = document.getElementById("publisher").value
        let datePublished = document.getElementById("published_date").value

        let obj = {
            isbn: isbn,
            title: bookTitle,
            overdueFee: overFee,
            publisher: Publisher,
            datePublished: datePublished
        }
        
    let sucessMessage = `<div class="alert alert-dismissible alert-success">
    <button type="text" class="close" data-dismiss="alert">&times;</button>
    <strong>Well done!</strong> You successfully added the Book !!!
  </div>`
            
     document.getElementById("display_Message").innerHTML += sucessMessage;

        fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)

        });

       

    
}

}