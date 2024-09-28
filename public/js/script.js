
let timer;
    
document.getElementById('searchBox').addEventListener('input', function() {
    clearTimeout(timer); // Clear the previous timer
    
    // Set a new timer for 2 seconds (1000 milliseconds)
    timer = setTimeout(() => {
        this.form.submit(); 
    }, 1000);
});


document.addEventListener('click', function (event) {
    if (window.location.pathname === '/searchList') {
        const searchBox = document.getElementById('searchBox');
        const resultsList = document.querySelector('.drop-down-list');

        if (searchBox && resultsList) {

            if (!searchBox.contains(event.target) && !resultsList.contains(event.target)) {
                resultsList.style.display = 'none'; // Hide results
                window.location.href = '/';
            }
        }
    }
});


function handler(id) {

    event.preventDefault();

    document.getElementById("edit" + id).setAttribute("hidden", true);
    document.getElementById("book-notes-para").setAttribute("hidden", true);

    document.getElementById("input" + id).removeAttribute("hidden");
    document.getElementById("done" + id).removeAttribute("hidden");

}

