
let current_search_string = ""

let favorite_media_list;


search_bar = document.getElementById("searchBar");
movie_list = document.getElementById("movie_list");


// function to fetch and process json from the following web address
async function fetch_media_list() {
    fetch("https://alouderback.github.io/Data/db.json")
        .then(response => response.json())
        .then(data => {
            console.log(data["favorites"]);
            favorite_media_list = data["favorites"];
        })
        .catch(error => console.error(error)
    );
}

// search for the term in the set of media
function get_matching_items(query_term) {
    console.log(favorite_media_list);
    let return_list = [];
    favorite_media_list.forEach((element) => {
        if (element.title.includes(query_term)) {
            return_list.push(element);
        }
    })
    console.log(return_list);
    if (query_term == "") {
        return favorite_media_list;
    }else {
        return return_list
    }
}

// set the innerHTML of the list of items to any array of objects with a title and type attribute
function set_items_listed(item_list) {
    console.log(item_list);
    movie_list.innerHTML = ""
    let movie_list_string = ""
    item_list.forEach(element => {
        movie_list_string += "<li>" + element.title + "</li>" + "type -> " + element.type
    });
    movie_list.innerHTML = movie_list_string
}

// listen for enter pressed on search bar, then update the results
search_bar.addEventListener("change", (_event) => {
    current_search_string = search_bar.value;
    set_items_listed(
        get_matching_items(
            current_search_string
        )
    );
});


fetch_media_list().then().catch();


// for whatever reason the fetch request takes extra time to resolve so this give an error
set_items_listed(favorite_media_list);