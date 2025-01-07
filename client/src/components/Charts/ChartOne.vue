<script setup lang="ts">
import { ref, onMounted } from 'vue';
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts';

const orders2024 = ref<number[]>([]);
const orders2025 = ref<number[]>([]);
const chart = ref(null);

const apexOptions = ref({
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  xaxis: {
    type: 'category',
    categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 400000,
  },
});

const chartData = ref({
  series: [
    {
      name: 'CA 2024',
      data: orders2024.value,
    },
    {
      name: 'CA 2025',
      data: orders2025.value,
    },
  ],
});

const fetchOrders = async (urlApi: string): Promise<number[] | null> => {
  const jwtToken = localStorage.getItem('jwtToken');
  try {
    const response = await fetch(urlApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error('Jeton expiré ou non valide');
        return null;
      }
      throw new Error('Erreur lors de la récupération des commandes');
    }

    const data = await response.json();
    console.log('commandes:', data);
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};

const loadOrders = async () => {
  const __VITE_API_URL__ = import.meta.env.VITE_API_URL;

  const url2024 = `${__VITE_API_URL__}/api/orders/totalAmountByMonth/2024`;
  const url2025 = `${__VITE_API_URL__}/api/orders/totalAmountByMonth/2025`;

  const [data2024, data2025] = await Promise.all([
    fetchOrders(url2024),
    fetchOrders(url2025),
  ]);

  if (data2024) orders2024.value = data2024;
  if (data2025) orders2025.value = data2025;

  chartData.value.series[0].data = orders2024.value;
  chartData.value.series[1].data = orders2025.value;

  const maxValue = Math.max(
    Math.max(...orders2024.value),
    Math.max(...orders2025.value)
  );
  apexOptions.value.yaxis.max = maxValue*1.1;
  if (chart.value) {
    chart.value.updateOptions({
      yaxis: {
        max: maxValue,
      },
    });
  }
};

onMounted(() => {
  loadOrders();
  console.log('Orders 2024:', orders2024.value);
  console.log('Orders 2025:', orders2025.value);
});
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5"
  >
    <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <div class="flex w-full flex-wrap gap-3 sm:gap-5">
        <div class="flex min-w-47.5">
          <span
            class="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary"
          >
            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
          </span>
          <div class="w-full">
            <p class="font-semibold text-primary">Chiffre d'affaire 2024</p>
          </div>
        </div>
        <div class="flex min-w-47.5">
          <span
            class="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary"
          >
            <span class="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
          </span>
          <div class="w-full">
            <p class="font-semibold text-secondary">Chiffre d'affaire 2025</p>
          </div>
        </div>
      </div>
      <div class="flex w-full max-w-45 justify-end">
        <div class="inline-flex items-center rounded-md bg-whiter p-1.5">
          <button
            class="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card"
          >
            Jour
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card"
          >
            Semaine
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card"
          >
            Mois
          </button>
        </div>
      </div>
    </div>
    <div>
      <div id="chartOne" class="-ml-5">
        <VueApexCharts
          type="area"
          height="350"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
