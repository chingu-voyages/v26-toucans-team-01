// const pni = document.querySelector('.principal-and-interest');
// const hi = document.querySelector('.homeowners-insurance');
// const pt = document.querySelector('.property-tax');
// const hoa = document.querySelector('.hoa-fees');
//
// const ctx = document.getElementById('myChart').getContext('2d');
// let myChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: [
//       'Principal and Interest',
//       'Homeowner Insurance',
//       'Property Tax',
//       'HOA Fees',
//     ],
//     datasets: [
//       {
//         label: 'Mortgage Payment',
//         data: [2296.75, 66, 458, 0],
//         backgroundColor: ['#90ee90', '#2adece', '#dd3b79', '#ff766b'],
//         borderWidth: 1,
//       },
//     ],
//   },
// });
//
// // Update on change
// const updateChartValue = (input, dataOrder) => {
//   input.addEventListener('change', (e) => {
//     myChart.data.datasets[0].data[dataOrder] = e.target.value;
//     myChart.update();
//   });
// };
//
// updateChartValue(pni, 0);
// updateChartValue(hi, 1);
// updateChartValue(pt, 2);
// updateChartValue(hoa, 3);
