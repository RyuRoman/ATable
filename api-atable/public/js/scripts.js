$( document ).ready(function() {

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });

    $("#btnLogin").click(function() {
        let body = {
            'email': $("#inputEmailAddress").val(),
            'password': $("#inputPassword").val()
        };
        $.ajax({
            type: "POST",
            url: '/api/user/login',
            data: body,
            success: function(data) {
                console.log(data);
                if (data.bearerToken) {
                    localStorage.setItem("bearerToken", "Bearer "+data.bearerToken);
                    document.location.href = '/backoffice/main';
                }
            },
            error: function(e) {
                alert("Mauvais identifiants");
                console.log(e);
            }
        });
    });

    $(".btnDeleteUser").click(function(){
        $.ajax({
            type: "DELETE",
            headers: {'Authorization': localStorage.getItem("bearerToken"),},
            url: $(this).attr('id'),
            success: function(data) {
                alert("Utilisateur ban def");
                console.log(data);
                document.location.reload();
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

    $(".commandPerItem").click(function() {
        console.log($(this).attr("id"));
        var hourArea = $("#perHourChartAreaBody");
        var dayArea = $("#perDayChartAreaBody");
        var monthArea = $("#perMonthChartAreaBody");
        var dropdown = $("#commandsDropdown");
        switch($(this).attr("id")) {
            case "commandPerHour":
                hourArea.removeAttr("hidden")
                dayArea.attr("hidden", "hidden")
                monthArea.attr("hidden", "hidden")
                dropdown.text("Par heure");
                break;
            case "commandPerDay":
                hourArea.attr("hidden", "hidden")
                dayArea.removeAttr("hidden")
                monthArea.attr("hidden", "hidden")
                dropdown.text("Par jour");
                break;
            case "commandPerMonth":
                hourArea.attr("hidden", "hidden")
                dayArea.attr("hidden", "hidden")
                monthArea.removeAttr("hidden")
                dropdown.text("Par mois");
                break;
        }
    });
});
