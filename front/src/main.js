const url = 'http://localhost:3000/'

let data = [300, 100, 300]


async function fetchCustomers(start_date, end_date) {
    start_date.toString().padStart(2, '0')
    end_date.toString().padStart(2, '0')
    try {
        const response = await axios.get(url + `customers/quantity?start_date=2023-${start_date}-01&end_date=2023-${end_date}-01`)
    
        const { data } = response;
    
        const monthNames = data.map(item => {
          const date = new Date(`${item.registration_year}-${item.registration_month}-01`)
          return date.toLocaleString('default', { month: 'long' });
        });
    
        const customerCounts = data.map(item => parseInt(item.customer_count))
    
        return { monthNames, customerCounts }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
}

async function fetchTotalCustomers() {
    return axios.get(url + 'customers/quantity/sum')
        .then(response => response.data[0].total_customers)
        .catch(error => console.error('Error fetching data:', error))
}

const chart = document.querySelector('#chart').getContext('2d')
const radioButtons = document.querySelectorAll('input[name="select_chart"]');
let customersChart

async function renderChart(data, chartName, labelNames, type) {  
    if(customersChart){
        customersChart.destroy()
    }
    customersChart = new Chart(chart, {
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
    const fetched_data = await fetchCustomers(1, 10)
    const total_customers = await fetchTotalCustomers()

    console.log(fetched_data)
    console.log(total_customers)

    document.querySelector("#total_number").textContent = total_customers
    renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')   

    radioButtons.forEach(radioButton => {
      //is it safe to call it async??
      //may put all the fetches at the end of main to run them when everything is rendered.
        radioButton.addEventListener('change', async function(event) {
          const selectedChartType = event.target.value

          switch(selectedChartType){
            case 'customers':
              document.querySelector("#total_number").textContent = total_customers
              document.querySelector("#total_number_description").textContent = "Total amount of customers"
              renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')
              break
            case 'orders':
              console.log('order')
              const fetched_orders = await fetchOrders(1, 10)
              renderChart(fetched_orders.orderCounts, "amount of orders throughout months:", fetched_orders.monthNames, 'line')
              const total_orders = await fetchTotalOrders()
              document.querySelector("#total_number").textContent = total_orders
              document.querySelector("#total_number_description").textContent = "Total amount of orders:"
              break
            case 'revenue':
              console.log('revenue')
              const fetched_revenue = await fetchRevenue(1, 10)
              renderChart(fetched_revenue.revenues, "revenue each month:", fetched_revenue.monthNames, 'line')
              const total_revenue = await fetchTotalRevenue()
              document.querySelector("#total_number").textContent = total_revenue.toFixed(2) + '$'
              document.querySelector("#total_number_description").textContent = "Total revenue:"
              break
          }
          // renderChart(data)
        })
      })
}

main()

function test(){
    console.log('test')
}

async function updateTimeframes(inputLeft, inputRight){
  const radios = document.querySelectorAll('input[name="select_chart"]')
  const selectedRadio = Array.from(radios).find(radio => radio.checked)
  let fetched_data

  switch(selectedRadio.value){
    case 'customers':
      fetched_data = await fetchCustomers(inputLeft, inputRight)
      renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames, 'bar')
      break
    case 'orders':
      fetched_data = await fetchOrders(inputLeft, inputRight)
      renderChart(fetched_data.orderCounts, "amount of orders throughout months:", fetched_data.monthNames, 'line')
    case 'revenue':
      fetched_data = await fetchRevenue(inputLeft, inputRight)
      renderChart(fetched_data.revenues, "revenue each month:", fetched_data.monthNames, 'line')
      break
  }
}