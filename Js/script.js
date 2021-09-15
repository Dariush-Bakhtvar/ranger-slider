const rangeBar = document.getElementById('rangerBar');
const rangeBtn = document.getElementById('rangerBtn');
const rangeTrunk = document.querySelector('.renger-trunk');
const tooltip = document.querySelector('.tooltip span');
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
        // croodins left and right shouldn't be less than zero
        if (coordins.left < 0) coordins.left = 0;
        if (coordins.right < 0) coordins.right = 0;
        // croodins left  and right shouldn't be greater than  rangerbar width
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
rangeBtn.addEventListener('mousedown', (event) => {
    isDown = true;
    offsetX = [
        rangeBtn.offsetLeft - event.clientX
    ];
    tooltip.classList.add('active');
}, true);
rangeBar.addEventListener('mouseup', () => {
    isDown = false;
    tooltip.classList.remove('active');
}, true);
rangeBar.addEventListener('mousemove', (event) => {
    event.preventDefault();
    let getCroodin = rangeBar.getBoundingClientRect();
    if (isDown) {
        mousePosition = {
            left: event.clientX,
            right: event.clientX - getCroodin.right - rangeBtn.clientWidth
        };
        let coordin = mousePosition.left + offsetX[0];
        // coordin should not be  less than of zero
        if (coordin < 0) coordin = 0;
        //coordin should not be greater than of rangerBar width
        if (coordin > rangeBar.clientWidth) {
            Math.ceil(coordin = rangeBar.clientWidth);
        }
        rangeBtn.style.left = `${coordin}px`;
        tooltip.style.left = `${coordin}px`;
        if (tooltip.style.left > `711px`) {
            tooltip.style.left = `711px`;
        }
        console.log(rangeBar.clientWidth);
        // show progress based on present 
        tooltip.innerHTML = Math.ceil((coordin / rangeBar.clientWidth) * 100);
        //show trunk bg-color based on width
        rangeTrunk.style.width = `${Math.ceil(coordin / rangeBar.clientWidth * 100)}%`;
    }
}, true);