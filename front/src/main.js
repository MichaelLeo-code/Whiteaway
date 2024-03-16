const url = 'http://localhost:3000/'

let data = [300, 100, 300]


async function fetchCustomers() {
    try {
        const response = await axios.get(url + 'customers/quantity?start_date=2024-01-01&end_date=2024-04-01')
    
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

async function renderChart(data, chartName, labelNames) {  
    if(customersChart){
        customersChart.destroy()
    }
    customersChart = new Chart(chart, {
      type: 'bar',
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
    const fetched_data = await fetchCustomers()
    const total_customers = await fetchTotalCustomers()
    console.log(fetched_data)
    console.log(total_customers)

    document.querySelector("#total_number").textContent = total_customers

    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            const selectedChartType = event.target.value

            switch(selectedChartType){
                case 'customers':
                    data = [100, 100, 100]
                    break
                case 'orders':
                    data = [100, 200, 300]
                    break
                case 'orderItems':
                    data = [300, 200, 100]
                    break
            }
            renderChart(data)
        })
      })
    renderChart(fetched_data.customerCounts, "new customers throughout months:", fetched_data.monthNames)
}

main()