window.onload = loadFunction
/**
 * Loading function to wraping the global objects during loading 
 */
 function loadFunction() {
    let bookList;
    let display = document.getElementById('outPut');
    document.getElementById("searchButton").addEventListener('click',searchTerm);


    
    /**
     * Feaching the books List from server 
     * @return result of books 
     */
    async function getBooks() {
        const response = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
         bookList  = await response.json();
       
        
    
    let tableContent =`
          
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
            let count =0;
    bookList.forEach(element=>{
        tableContent += `
        <tr class= "table-active">
        <th scope= "row">${++count}</th>
        <td>${element.title}</td>
        <td>${element.isbn}</td>
        <td>${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})
        .format(element.overdueFee)}</td>
        <td>${element.publisher}</td>
        <td>${element.datePublished}</td>
        <td><a href = "editBook.html?bookId=${element.bookId}">Edit</a></td>
        <td><a data-toggle="modal"
        data-bookId="${element.bookId}" data-bookisbn="${element.isbn}"
        data-booktitle ="${element.title}"
        href = "#confirmDeleteBookModal">Delete</a></td>
        </tr>`;
    })
    display.innerHTML = tableContent;
    }
    
    getBooks();


  
     /**
      * Searching for the user Input from the list of books we have 
      * @return List of muching books 
      */
     function searchTerm() {
    
        input = document.getElementById("searchTerm");
        searchButton = document.getElementById("searchButton");
        filter = input.value.toUpperCase();
        let storage = [];
        for (let element of bookList) {
            if (element.title.toUpperCase().indexOf(filter)>-1) {
                storage.push(element);

            }
        }
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
                    <td><a href = "editBook.html?bookId=${element.bookId}">Edit</a></td>
                    <td><a data-toggle="modal"
                    data-bookId="${element.bookId}" data-bookisbn="${element.isbn}"
                    data-booktitle ="${element.title}"
                    href = "#confirmDeleteBookModal" >Delete</a></td>
                    </tr>`;
                })
                display.innerHTML = tableContent;
            }


}