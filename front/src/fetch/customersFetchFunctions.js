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
    return axios.get(url + 'customers/quantity')
        .then(response => response.data[0].total_customers)
        .catch(error => console.error('Error fetching data:', error))
}
