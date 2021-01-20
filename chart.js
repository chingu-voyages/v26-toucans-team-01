const principalandinterest = document.querySelector('.principal-and-interest');
const homeownersinsurance = document.querySelector('.homeowners-insurance');
const propertytax = document.querySelector('.property-tax');
const hoa = document.querySelector('.hoa-fees');

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Principal and Interest',
      'Homeowner Insurance',
      'Property Tax',
      'HOA Fees',
    ],
    datasets: [
      {
        label: 'Mortgage Payment',
        data: [0, 0, 0, 0],
        backgroundColor: ['#90ee90', '#2adece', '#dd3b79', '#ff766b'],
        borderWidth: 1,
      },
    ],
  },
});

const updateChartValue = (input, dataOrder) => {
  input.addEventListener('change', (e) => {
    myChart.data.datasets[0].data[dataOrder] = e.target.value;
    myChart.update();
  });
};

updateChartValue(principalandinterest, 0);
updateChartValue(homeownersinsurance, 1);
updateChartValue(propertytax, 2);
updateChartValue(hoa, 3);
