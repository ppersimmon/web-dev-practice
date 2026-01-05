const btns = document.querySelectorAll(".btn");
const valueDisplay = document.querySelector("#value");
let counter = 0;

function updateDisplay() {
    valueDisplay.textContent = counter;

    if (counter > 0) {
        valueDisplay.style.color = "#93BD57";
    } else if (counter < 0) {
        valueDisplay.style.color = "#980404";
    } else {
        valueDisplay.style.color = "#061E29";
    }
}


btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")) {
            counter--;
        } else if (styles.contains("increase")) {
            counter++;
        } else {
            counter = 0;
        }
        updateDisplay();
    });
});