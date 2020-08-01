$(function()  {
    // $(".change-sleep").on("click", function(event) {
    //     var id = $(this).data("id");
    //     var newSleep = $(this).data("newsleep");
    
    //     var newSleepState = {
    //       sleepy: newSleep
    //     };
    
    //     // Send the PUT request.
    //     $.ajax("/api/cats/" + id, {
    //       type: "PUT",
    //       data: newSleepState
    //     }).then(
    //       function() {
    //         console.log("changed sleep to", newSleep);
    //         // Reload the page to get the updated list
    //         location.reload();
    //       }
    //     );
    //   });

    // UPDATE DEVOUR STATUS
    $(".change-devour").on("click", function(event) {
       let id = $(this).data("id");
        let newDevour= $(this).data("devour");
        console.log(newDevour)
        let newDevourState = {
            devoured: newDevour
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(() => {
            console.log("Changed devoured state to: ", newDevourState);
            location.reload();
        });
    });

    // ADD BURGER
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        const newBurger = {
            burger_name: $("#burger").val().trim()
        }

        $.ajax("/api/burgers", {
            type:"POST",
            data: newBurger
        }).then(() =>{
            console.log("Created new burger: ", newBurger);
            location.reload();
        });
    });

    // DELETE BURGER
    $(".delete-burger").on("click", function() {
        event.preventDefault();
        let id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(() => {
            console.log("Deleted burger: ", id);
            location.reload();
            
        });
    });
});