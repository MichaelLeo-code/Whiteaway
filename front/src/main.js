const url = 'http://localhost:3000/'

async function fetchData() {
    return axios.get(url + 'customers')
        .then(response => console.log(response.data))
        .catch(error => console.error('Error fetching data:', error))
}

const chart = document.querySelector('#chart').getContext('2d')
const radioButtons = document.querySelectorAll('input[name="select_chart"]');

async function renderChart(data) {  
    const customersChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3'],
        datasets: [{
          label: 'My Dataset',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
      }
    });
}

async function main(){
    // const data = await fetchData()
    let data = [300, 100, 300]
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
          const selectedChartType = event.target.value

          switch(selectedChartType){
            case 'customers':
                data = [100, 100, 100]
            case 'orders':
                data = [100, 200, 300]
            case 'orders':
                data = [300, 200, 100]
          }
          renderChart(data)
        })
      })
    renderChart(data)
}

main()