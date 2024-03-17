// https://codepen.io/MinzCode/pen/MWKgyqb?editors=1010
var inputLeft = document.getElementById("input-left")
var inputRight = document.getElementById("input-right")

var thumbLeft = document.querySelector(".slider > .thumb.left")
var thumbRight = document.querySelector(".slider > .thumb.right")
var range = document.querySelector(".slider > .range")

async function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max)

	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1)

	var percent = ((_this.value - min) / (max - min)) * 100

	thumbLeft.style.left = percent + "%"
	range.style.left = percent + "%"

    const fetched_data = await fetchCustomers(_this.value, inputRight.value)
    renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')
}
setLeftValue();

async function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max)

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1)

	var percent = ((_this.value - min) / (max - min)) * 100

	thumbRight.style.right = (100 - percent) + "%"
	range.style.right = (100 - percent) + "%"

    const fetched_data = await fetchCustomers(inputLeft.value, _this.value)
    renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')
}
setRightValue()

inputLeft.addEventListener("input", setLeftValue)
inputRight.addEventListener("input", setRightValue)

inputLeft.addEventListener("mouseover", function() {
	thumbLeft.classList.add("hover")
})
inputLeft.addEventListener("mouseout", function() {
	thumbLeft.classList.remove("hover")
})
inputLeft.addEventListener("mousedown", function() {
	thumbLeft.classList.add("active")
})
inputLeft.addEventListener("mouseup", function() {
	thumbLeft.classList.remove("active")
})

inputRight.addEventListener("mouseover", function() {
	thumbRight.classList.add("hover")
})
inputRight.addEventListener("mouseout", function() {
	thumbRight.classList.remove("hover")
})
inputRight.addEventListener("mousedown", function() {
	thumbRight.classList.add("active")
})
inputRight.addEventListener("mouseup", function() {
	thumbRight.classList.remove("active")
})
