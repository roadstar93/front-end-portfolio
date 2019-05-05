//Check off specific todos

//--------------N
//We need to use .on("click") instead of .click() because the new elements that are added will not have applied the click listeners
//The other big problem is that we need existing elements before the new one was created and apply the code on those and pass the new ones as arguments in a function
$("ul").on("click", "li", function () { 
    //The code below can be replaced with 1 single line
    // //if li is grey turn it black
    // if ($(this).css("color") === "rgb(128, 128, 128)") {  //if we compare colors we need to compare it to the RGB version, otherwise it will not work
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     })
    //     //else make it grey
    // } else {
    //     $(this).css({ //this refers to only the specific li that was clicked
    //         color: "grey",
    //         textDecoration: "line-through" //adding a strikethrough effect to the text
    //     })
    // }

    $(this).toggleClass("completed");
})

//click on "X" to delete to do
$("ul").on("click","span", function (event) { //we need to add a variable inside the function (it can be "e" or "event") and inside the body add another method to stop the propagation
    // $(this).parent().remove(); //with the parent() method we can remove the parent of the element
    $(this).parent().fadeOut(500, function () {
        $(this).remove(); //We are first fading out the parent element and then "this" parent element will be removed
    });
    event.stopPropagation(); //This is added so the parent listeners do not trigger
})

//Get data from input field

$("input[type = 'text']").keypress(function (event) {
    if (event.which === 13) { //checking if enter was pressed
        var todoText = $(this).val(); //Getting the value inside the input
        //removing the added value from the input field
        $(this).val("");
        //create a new li to add to the list
        $("ul").append("<li><span class='span-list'><i class='fas fa-trash'></i></span> " + todoText + "</li>") //This will be added to the ul as html code
    }

})

//Hide input field when pressing plus
$(".fa-plus-square").click(function() {
    $("input[type = 'text']").fadeToggle();
})

