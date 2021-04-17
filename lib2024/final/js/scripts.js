

//This ensures the page has loaded before the function is run.
window.onload = init;


function init() {
	
    // This is for the display of nav menu the hamburger is clicked
	document.querySelector('.ham').onclick = showHideMobileMenu;
	// This loads the table
	$('#loadTable').click(function (e) {
		// Prevents multiple tables from being loaded
   		 e.preventDefault();
   		 //This fades in the loader animation 
   		 $(".overlay-container").fadeIn(1000, function(){
   		 		// This calls the funciton to create the schedule table from JSON data
   		 		createTableFromJSON();
		   		 // This fades the loader animation out 
   		 		$('.overlay-container').delay(500).fadeOut(500);
   		 })
   	});
    //This controls what occurs when the submit button of the form is clicked
    $('#form').submit(function (e) {
        //Prevents mutliple results from being loading
         e.preventDefault();
         $("#results").removeClass('reveal');
         //Creates variable "form"
         var form = this;
         //This fades in the loader animation  
         $(".overlay-container").fadeIn(1000, function(){
                //This function shows the contents of the variable form
                showformValues(form);              
                // This fades the loader animation out 
                $('.overlay-container').delay(500).fadeOut(500);
                $("#results").addClass('reveal');
         })
    });

}

// This is the function that allows for the hamburger to open and close
function showHideMobileMenu() {

	var mobileNav = document.querySelector('.mobile-nav');

	if(mobileNav.style.display=="block") {
		mobileNav.style.display="none";
	} else {
		mobileNav.style.display="block";
	}

}

// This is the function that creates the table from JSON data
function createTableFromJSON() {
        var mySched = [
            {
                "TIME": "09:00 - 11:00",
                "MONDAY": "Communications I",
                "TUESDAY": "Client Services",
                "WEDNESDAY": "Special Collections",
                "THURSDAY": "Directed Research Seminar",  
                "FRIDAY": "Client Services",               
                
            },
            {
                "TIME": "11:00 - 12:30",
                "MONDAY": "Reference",
                "TUESDAY": "Internet App",
                "WEDNESDAY": "Library Software",
                "THURSDAY": "French",  
                "FRIDAY": "Reference",               
                
            },
           {
                "TIME": "14:00 - 15:00",
                "MONDAY": "Acquisitions",
                "TUESDAY": "General Elective",
                "WEDNESDAY": "Marketing",
                "THURSDAY": "Emerging Library Tech",  
                "FRIDAY": "Library Software",               
                
            },
            {
                "TIME": "15:30 - 17:30",
                "MONDAY": "French",
                "TUESDAY": "French",
                "WEDNESDAY": "Acquisitions",
                "THURSDAY": "Subject Analysis",  
                "FRIDAY": "Internet App",               
                
            }
        ]
        
        // This extracts the values for the header of the table 
        var col = [];
        for (var i = 0; i < mySched.length; i++) {
            for (var key in mySched[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // This creates the variable table
        var table = document.createElement("table");

        // This creates the table's header

        var tr = table.insertRow(-1);                   

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");     
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // This loops through mySched extracting the values and creating all the other rows of the table 
        for (var i = 0; i < mySched.length; i++) {
        	
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {			
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = mySched[i][col[j]];
            }
        }

        //This adds the table to a container to display it
        var divContainer = document.getElementById("json_table");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

//This is the funciton that shows the Profile Info from the Profile Edit form
function showformValues(form){
   
    var formValues = $(form).serializeArray(); 
  
        
    $.each(formValues, function(index, field){

     
        $("#results").find("#"+field.name+"_result").text(field.value);

        // These if statements check for type of field result and concatenate characters to create an emial link, and to add commes to the displayed address
       if(field.name=="email"){
            $("#results").find("#"+field.name+"_result2").attr("href", "mailto:"+field.value);
        }
        if(field.name=="address"){
            $("#results").find("#"+field.name+"_result").text(field.value+", ");
        }
        if(field.name=="city"){
            $("#results").find("#"+field.name+"_result").text(field.value+",");
        }
         if(field.name=="province"){
            $("#results").find("#"+field.name+"_result").text(field.value+", ");
        }
        
        

    })              
}