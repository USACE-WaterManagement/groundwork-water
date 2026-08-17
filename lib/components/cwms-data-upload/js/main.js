//========================================================================
//
//          Handle Top Button for returning to top of page
//
//========================================================================

// When the user clicks on the button, scroll to the top of the document
function toTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", function () {

const toTopBtn = document.getElementById("returnTop");
  console.log(toTopBtn);

  // Add the button handlers if the user has the element ID in their page
  if (toTopBtn) {
    toTopBtn.onclick = function () {
      toTopFunction();
    };
    function onScroll() {
      if (
        // User scrolls more than 50pixels, show the button
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        // Toggle button visibility
        document.getElementById("returnTop").style.display = "block";
      } else {
        document.getElementById("returnTop").style.display = "none";
      }
    }
    // Trigger the scroll function when the user scrolls in the window
    window.onscroll = function () {
      onScroll();
    };
  }
});