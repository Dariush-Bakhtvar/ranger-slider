const rangeBar = document.getElementById('rangerBar');
const rangeBtn = document.getElementById('rangerBtn');
const rangeTrunk = document.querySelector('.renger-trunk');
let mousePosition, offsetX = [0],
    isDown = false;
class ranger {
    constructor(barId, btnId) {
        this.barId = barId;
        this.btnId = btnId;
    }
    handleEvent(event) {
        // get element coordins in the page
        let getCroodin = this.barId.getBoundingClientRect();
        const coordins = {
            left: event.clientX - getCroodin.left - this.btnId.clientWidth / 2,
            right: event.clientX - getCroodin.right - this.btnId.clientWidth / 2
        };
        // croodins left shouldn't be less than zero
        if (coordins.left < 0) coordins.left = 0;
        // croodins left shouldn't be greater than  rangerbar width
        if (coordins.left + this.btnId.clientWidth > this.barId.clientWidth) {
            coordins.left = this.barId.clientWidth - this.btnId.clientWidth;
        }
        if (coordins.right + this.btnId.clientWidth > this.barId.clientWidth) {
            coordins.right = this.barId.clientWidth - this.btnId.clientWidth;
        }
        this.btnId.style.left = `${coordins.left}px`;
        this.btnId.style.right = `${coordins.right}px`;
    }
}
let range = new ranger(rangeBar, rangeBtn);
rangeBar.addEventListener('click', range);