async function fetchRevenue(start_date, end_date) {
    start_date.toString().padStart(2, '0')
    end_date.toString().padStart(2, '0')
    try {
        const response = await axios.get(url + `revenue?start_date=2023-${start_date}-01&end_date=2023-${end_date}-01`)
    
        const { data } = response;
    
        const monthNames = data.map(item => {
          const date = new Date(`${item.year}-${item.month}-01`)
          return date.toLocaleString('default', { month: 'long' });
        });
    
        const revenues = data.map(item => parseInt(item.revenue))
    
        return { monthNames, revenues }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
}

async function fetchTotalRevenue() {
    return axios.get(url + 'revenue')
        .then(response => response.data[0].total_revenue)
        .catch(error => console.error('Error fetching data:', error))
}
