$(function()  {
   
    // UPDATE DEVOUR STATUS
    $(".change-devour").on("click", function(event) {
        let id = $(this).data("id");
        let newDevour= $(this).data("devour");
        
        if (!newDevour) {
            newDevour = true;
        } else {
            newDevour = false;
        }
        
        let newDevourState = {
            devoured: newDevour
        };
        console.log(newDevourState);

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
        
        if ($("#burger").val() === "") {
            return false;
        };

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