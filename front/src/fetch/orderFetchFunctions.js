async function fetchOrders(start_date, end_date) {
    start_date = interpretNumberToDate(start_date)
    end_date = interpretNumberToDate(end_date)

    try {
        const response = await axios.get(url + `orders/quantity?start_date=${start_date}-01&end_date=${end_date}-01`)
    
        const { data } = response;
    
        const monthNames = data.map(item => {
          const date = new Date(`${item.year}-${item.month}-01`)
          return date.toLocaleString('default', { month: 'long' });
        });
    
        const orderCounts = data.map(item => parseInt(item.purchase_count))
    
        return { monthNames, orderCounts }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
}

async function fetchTotalOrders() {
    return axios.get(url + 'orders/quantity')
        .then(response => response.data[0].total_orders)
        .catch(error => console.error('Error fetching data:', error))
}
