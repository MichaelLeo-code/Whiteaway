const url = 'http://localhost:3000/'

const chart = document.querySelector('#chart').getContext('2d')
const radioButtons = document.querySelectorAll('input[name="select_chart"]');
let mainChart

async function renderChart(data, chartName, labelNames, type) {  
    if(mainChart){
      mainChart.destroy()
    }
    mainChart = new Chart(chart, {
      type: type,
      data: {
        labels: labelNames,
        datasets: [{
          label: chartName,
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
      }
    })
}

async function main(){
  let fetched_customers = await fetchCustomers(1, 16)
  let total_customers = await fetchTotalCustomers()
  let best_customers = await fetchTopCustomers()
  const best_customers_list = document.querySelector('.card-list')
  const best_customers_card = document.querySelector('.card_of_leaders')

  best_customers.forEach(customer => {
    const li = document.createElement('li')
    const totalValueSpan = document.createElement('span');
    li.textContent = `${customer.firstName} ${customer.lastName} - `
    totalValueSpan.textContent = customer.total_value.toFixed(2) + '$'
    totalValueSpan.classList.add('total-value')
    li.appendChild(totalValueSpan)
    best_customers_list.appendChild(li)
  });

  document.querySelector("#total_number").textContent = total_customers
  renderChart(fetched_customers.customerCounts, "new customers throughout months:", fetched_customers.monthNames, 'bar')   

  radioButtons.forEach(radioButton => {
    //is it safe to call it async??
    //may put all the fetches at the end of main to run them when everything is rendered.
      radioButton.addEventListener('change', async function(event) {
        const selectedChartType = event.target.value
        let totalNumber = document.querySelector("#total_number")
        let totalNumberDescription = document.querySelector("#total_number_description").textContent

        switch(selectedChartType){

          case 'customers':
            const fetched_customers = await fetchCustomers(inputLeft.value, inputRight.value)
            const total_customers = await fetchTotalCustomers()

            totalNumber.textContent = total_customers
            totalNumberDescription = "Total customers amount:"
            best_customers_card.style.display = ""
            renderChart(fetched_customers.customerCounts, "new customers throughout months:", fetched_customers.monthNames, 'bar')
            break

          case 'orders':
            const fetched_orders = await fetchOrders(inputLeft.value, inputRight.value)
            const total_orders = await fetchTotalOrders()

            totalNumber.textContent = total_orders
            totalNumberDescription = "Total amount of orders:"
            best_customers_card.style.display = "none"
            renderChart(fetched_orders.orderCounts, "amount of orders throughout months:", fetched_orders.monthNames, 'line')
            break

          case 'revenue':
            console.log('revenue')
            const fetched_revenue = await fetchRevenue(inputLeft.value, inputRight.value)
            const total_revenue = await fetchTotalRevenue()

            totalNumber.textContent = total_revenue.toFixed(2) + '$'
            totalNumberDescription = "Total revenue:"
            best_customers_card.style.display = "none"
            renderChart(fetched_revenue.revenues, "revenue each month:", fetched_revenue.monthNames, 'line')
            break
        }
      })
  })
}

main()

async function updateTimeframes(inputLeft, inputRight){
  const radios = document.querySelectorAll('input[name="select_chart"]')
  const selectedRadio = Array.from(radios).find(radio => radio.checked)
  let fetched_data

  switch(selectedRadio.value){
    case 'customers':
      fetched_data = await fetchCustomers(inputLeft, inputRight)
      await renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')
      break
    case 'orders':
      console.log('orders')
      fetched_data = await fetchOrders(inputLeft, inputRight)
      renderChart(fetched_data.orderCounts, "amount of orders throughout months:", fetched_data.monthNames, 'line')
      break
    case 'revenue':
      console.log('revenue')
      fetched_data = await fetchRevenue(inputLeft, inputRight)
      renderChart(fetched_data.revenues, "revenue each month:", fetched_data.monthNames, 'line')
      break
  }
}

function interpretNumberToDate(value) {
  const year = Math.floor(value / 13) + 2023
  const month = ((value - 1) % 12) + 1 
  
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}`
  
  return formattedDate
}