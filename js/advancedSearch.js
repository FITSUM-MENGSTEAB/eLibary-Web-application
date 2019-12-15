window.onload = loadFunction

function loadFunction() {

    document.getElementById("searchBook").addEventListener('click', advancedSearch);


    /**
     * Advanced Searching for the user Input from the list of books 
     * @return List of muching results
     */
    async function advancedSearch() {
        // clear the display of the form 
        document.getElementById("advSearch").style.display = "none";
        document.getElementById("advancedSearchOut").style.display = "inline"

        display = document.getElementById('advancedSearchOut');

        const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
        let bookList = await response.json();
            console.log(bookList);
        titleInput = document.getElementById("title").value.toUpperCase();
        isbnInput = document.getElementById("isbn").value.toUpperCase();
        overdueInput = document.getElementById("overdue").value;
        publisherInput = document.getElementById("publisher").value.toUpperCase();
        published_dateInput = document.getElementById("published_date").value;

             console.log(overdueInput);
             console.log(publisherInput);
        let storage = [];
        for (let element of bookList) {


            if (titleInput) {
                if (element.title.toUpperCase().indexOf(titleInput) > -1) {
                    storage.push(element);

                }
                document.getElementById("error").style.display="inline"
                  document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
            } else if (isbnInput) {
                if (element.isbn.indexOf(isbnInput) > -1) {
                    storage.push(element);

                }
                document.getElementById("error").style.display="inline"
                document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
            } else if (overdueInput) {
                if (element.overdueFee == overdueInput) {
                    storage.push(element);
                }
                document.getElementById("error").style.display="inline"
                  document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
            } else if (publisherInput) {
                if (element.publisher.toUpperCase().indexOf(publisherInput) > -1) {
                    storage.push(element);
                }
                else document.getElementById("error").style.display="inline"
                  document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
            }
                 else if (published_dateInput) {
                    if (element.datePublished == published_dateInput) {
                        storage.push(element);
                    }
                    else document.getElementById("error").style.display="inline"
                   document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
                }

                 // no much found 

                else {
                    document.getElementById("error").style.display="inline"
                  document.getElementById("error").innerHTML="Sorry we didn't find the book that much your search term !!"
                }
            }
           // document.getElementById("error").style.display="none"
        let tableContent = `
      
                     <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id #</th>
                                <th scope="col">Title</th>
                                <th scope="col">Isbn</th>
                                <th scope="col">Overduepay</th>
                                <th scope="col">Publisher</th>
                                <th scope="col">Date Published</th>
                
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        `;
        let count = 0;

        // looping over the much items 
        storage.forEach(element => {
            tableContent += `
                    <tr class= "table-active">
                    <th scope= "row">${++count}</th>
                    <td>${element.title}</td>
                    <td>${element.isbn}</td>
                    <td>${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})
                    .format(element.overdueFee)}</td>
                    <td>${element.publisher}</td>
                    <td>${element.datePublished}</td>
                    `;
        })
        display.innerHTML = tableContent;
    }
  document.getElementById("reset").addEventListener("click",reset)
    function reset(){
        display.style.display = "none"
        document.getElementById("error").style.display = "none"
        document.getElementById("advSearch").style.display = "inline";
    }


}