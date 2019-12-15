window.onload = functionLoad;
/**
 * Function to wrap the function as global the 
 * @return a table with data of books  with the value edited 
 */
function functionLoad() {

    //get the bookId URL 
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("bookId");
    document.getElementById('bookSave').addEventListener('click', sendEditedBook);


    /**
     * Function used to edit the books content 
     * @param {object}  - object of book with contents 
     */
    async function editBook() {
       const response = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        })
        const result = await response.json();

        document.getElementById("title").value = result.title;
        document.getElementById("isbn").value = result.isbn;
        document.getElementById("overdue").value = result.overdueFee;
        document.getElementById("publisher").value = result.publisher;
        document.getElementById("published_date").value = result.datePublished;

    }
    // calling 
    editBook();

  

    /**
     * Function used to send the updated data of the same book
     *@return {object} - send an updated book info to the server 
     */
    function sendEditedBook() {
          
            const display =  document.getElementById("spanDisplay");
                if(display.style.display === "none"){
                    display.style.display = "inline-block"
                }


             // success  message
        
        //document.getElementById("display_message").innerHTML = sucessMessage;

            // 
        let isbn = document.getElementById("isbn").value
        let title = document.getElementById("title").value
        let overdue = document.getElementById("overdue").value
        let publisher = document.getElementById("publisher").value
        let datePublished = document.getElementById("published_date").value

        let obj = {
            isbn: isbn,
            title: title,
            overdueFee: overdue,
            publisher: publisher,
            datePublished: datePublished
        }


        fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)

        });
        


}

    }



