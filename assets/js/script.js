$(document).ready(function () {


    //  Toggle show class from navbar
    $(".navbar-toggler").on("click", function(){
        $(this).toggleClass("closer");
        $(".navbar").toggleClass("show");
        $(".content-wrapper").toggleClass("overflow-hidden");
    })
    
    //  Toggle show class from navbar
    $(".header__list-toggler").on("click", function(){
        $(".header__list").toggleClass("show");
    })

    //  Toggle active class from Navbar Items
    $(".navbar-item").on("click", function(){
        $(".navbar-item").removeClass("active");
        $(this).addClass('active');
    })

    // Closes mobile menu when a scroll link is clicked
    $('.navbar-link').on('click', function (e) {
        e.preventDefault();
        $(".navbar-toggler").removeClass("closer");
        $(".navbar").removeClass("show");
        $(".content-wrapper").removeClass("overflow-hidden");
    });


    // //  Banner slider
    // $(".banner__slider").slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 4000,
    //     fade: true,
    //     cssEase: 'linear',
    //     speed: 500,
    //     arrows: true,
    //     prevArrow:'<i class="fas fa-chevron-left slick__arrows slick__arrows--left"></i>',
    //     nextArrow:'<i class="fas fa-chevron-right slick__arrows slick__arrows--right"></i>',
    //     dots: false,
    //     pauseOnHover: false,
    //     pauseOnFocus: false,
    //     infinite: true,
    // });

});

const themeToggler = document.querySelector(".theme-toggler");
let lightMode = localStorage.getItem("lightMode");

/*** Chart JS Color's ***/
let ticksColor = '#6b6b88';
let titleColor = '#cecdde';
let gridColor = "#282d49";
let legendColor = '#c0c0cb';

/***  Chart JS  ***/
const lineChart = document.getElementById('lineChart').getContext("2d");
// Border & Fill "rgb" color code
const fillRGB = '121, 119, 254';
/*** Create Gradient Color ***/
const gradientFill = lineChart.createLinearGradient(0, 0, 0, 500);
gradientFill.addColorStop(0, `rgba( ${fillRGB}, 0.2)`);   
gradientFill.addColorStop(0.5, `rgba( ${fillRGB}, 0.1)`);
gradientFill.addColorStop(1, `rgba( ${fillRGB}, 0)`);

var singleLineChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: ['', '10/09/2021', '20/09/2021', '30/09/2021', '10/10/2021', '20/10/2021', '30/10/2021'],
        datasets: [{
            label: 'Design',
            data: [2.8, 3.2, 1.2, 5.1, 3.8, 2.5, 4.6],
            fill: true,
            backgroundColor: gradientFill,
            borderColor: `rgba( ${fillRGB} , 1)`,
            borderWidth: 5,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            tension: 0.5,
            // pointBorderColor: '#fcb149',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            pointRadius: 0,
            
        }],
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Structure Growth',
                align: 'start',
                color: titleColor,
                font: {
                    size: 20,
                    weight: 500,
                    family: "'Poppins', sans-serif",
                },
                padding: {
                    bottom: -25
                },
                fullWidth: false,
            },
            legend: {
                align: 'end',
                fullWidth: false,
                labels: {
                    font: {
                        size: 18,
                        weight: 400,
                        family: "'Poppins', sans-serif",
                    },
                    fill: true,
                    boxWidth: 9,
                    color: legendColor,
                    usePointStyle: true,
                },
            },
        },
        animation: {
            easing: 'easeInOutBack',
            duration: 1900,
            delay: 100,
        },
        scales: {
            x: {
              grid: {
                  display: false,
              },
              ticks: {
                  color: ticksColor,
                  font: {
                      size: 16,
                      family: "'Poppins', sans-serif",
                  }
              },
            },
            y: {
              grid: {
                  drawBorder: false,
                  tickColor: 'rgba(0, 0, 0, 0)',
                  lineWidth: 1.9,
                  color: gridColor,
              },
              ticks: {
                  color: ticksColor,
                  font: {
                    size: 18,
                    family: "'Poppins', sans-serif",
                }
              },
              suggestedMin: 1,
              suggestedMax: 6,
            },
        }
    }
});


// Enable LightMode Function
const enableLightMode = () =>{
    // 1. Add the class lightMode to the root Element
    document.body.classList.add("lightMode");
    // 2. Add the class toggle to themeToggler
    themeToggler.classList.add("toggle");
    // 3. Change the "aria-label" text in themeToggler
    themeToggler.setAttribute("aria-label", "Dark Mode");
    // 4. Update lightMode in the localStorage
    localStorage.setItem("lightMode", "enabled");
    // 5. Change Colors in Chart JS
    singleLineChart.options.scales.y.grid.color = "#f9f9f9";
    singleLineChart.options.plugins.title.color = "#292b3c";
    singleLineChart.options.plugins.legend.labels.color = "#6b6b88";
}

// Disable LightMode Function
const disableLightMode = () =>{
    // 1. Remove the class lightMode to the root Element
    document.body.classList.remove("lightMode");
    // 2. Remove the class toggle to themeToggler
    themeToggler.classList.remove("toggle");
    // 3. Change the "aria-label" text in themeToggler
    themeToggler.setAttribute("aria-label", "Light Mode");
    // 4. Update lightMode in the localStorage
    localStorage.setItem("lightMode", null);
    // 5. Change Colors in Chart JS
    singleLineChart.options.scales.y.grid.color = "#282d49";
    singleLineChart.options.plugins.title.color = "#cecdde";
    singleLineChart.options.plugins.legend.labels.color = "#c0c0cb";
}

// Check localStorage lightMode value
if(lightMode === "enabled"){
    enableLightMode();
}

// Theme Change Event Functions
themeToggler.addEventListener("click", ()=>{
    lightMode = localStorage.getItem("lightMode");
    if(lightMode !== "enabled"){
        enableLightMode();
    } else{
        disableLightMode();
    }
    singleLineChart.reset();
    singleLineChart.update();
})
