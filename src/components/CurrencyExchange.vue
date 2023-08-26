<template>
    <div class="currency-converter">
        <div class="filters">
            <div class="card">
                <div class="card-header mcap-card-header-primary">{{ $t('CurrencyConverter') }}</div>
                <div class="card-body">
                    <form @submit.prevent="submitConversion">
                        <div class="mb-3">
                            <label for="fromCurrency" class="form-label">{{ $t('FromCurrency') }}:</label>
                            <input v-model="fromCurrency" type="text" class="form-control" id="fromCurrency"
                                :placeholder="$t('FromCurrencyPlaceHolder')" @input="validateInput" required
                                :aria-invalid="fromCurrencyError" />
                            <div v-if="fromCurrencyError" class="error-message">{{ $t('fromCurrencyError') }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="toCurrency" class="form-label">{{ $t('toCurrency') }} :</label>
                            <input v-model="toCurrency" type="text" class="form-control" id="toCurrency"
                                :placeholder="$t('toCurrencyPlaceHolder')" @input="validateInput" required
                                :aria-invalid="toCurrencyError" />
                            <div v-if="toCurrencyError" class="error-message">{{ $t('toCurrencyError') }}</div>
                        </div>
                        <button type="submit" class="btn btn-primary mcap-btn-primary"
                            :disabled="fromCurrencyError || toCurrencyError">{{ $t('Convert') }}</button>
                    </form>
                </div>
            </div>

            <div class="card">
                <div class="card-header  mcap-card-header-primary">{{ $t('last3') }}</div>
                <div class="card-body">
                    <div class="trx-history" v-for="item in lastThreeTrx" :key="item">{{ item }}</div>
                </div>
                <div class="mb-3">
                    <label for="apiKey" class="form-label">{{ $t('APIKey') }}:</label>
                    <input v-model="apiKey" type="text" class="form-control" id="apiKey"
                        :placeholder="$t('APIKeyPlaceHolder')" required>
                    <div v-if="apiKeyError" class="error-message">{{ $t('apiKeyError') }}</div>
                </div>
            </div>
        </div>

        <div v-if="loadingState === 2" class="main-content">
            <div class="dropdown-container">
                <select v-model="selectedDataType" id="data-type" class="form-select mcap-select-dropdown">
                    <option v-for="item in viewOptions" :key="item.value" :value="item.value">{{
                        item.name }}</option>
                </select>
            </div>
            <div>
                <apexchart :options="chartData.chartOptions" :series="chartData.series"></apexchart>
            </div>
        </div>
        <div v-else class="status-message p-5">{{ statusMessage }}</div>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue';
import { currencies, mockData } from '../constants/data.json'
import axios from 'axios';
import { useLoginDetails } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';


const userStore = useLoginDetails()
const apiKey = ref('PO1HOC6OYRRSB9VR');
const apiKeyError = ref(false);

const validateAPIKey = () => {
    apiKeyError.value = !apiKey.value.trim();
};


const { lastThreeTrx } = storeToRefs(userStore)
const { t } = useI18n();

// const API_1 = 'G0HYH7PLR2J3CJUO'
// const API_2 = 'PO1HOC6OYRRSB9VR'
const BASE_URL = 'https://www.alphavantage.co/query?function=FX_DAILY'

const currenciesList = currencies.map(x => x.code)

const defaultView = '1. open'

const selectedDataType = ref(defaultView);

// const viewOptions = ref([
//     { name: 'Open', value: '1. open' },
//     { name: 'High', value: '2. high' },
//     { name: 'Low', value: '3. low' },
//     { name: 'Close', value: '4. close' },
// ])

const viewOptions = computed(() => [
    { name: t('open'), value: '1. open' },
    { name: t('high'), value: '2. high' },
    { name: t('low'), value: '3. low' },
    { name: t('close'), value: '4. close' },
]);
;
onMounted(() => {
    // fromCurrency.value = 'USD'
    // toCurrency.value = 'INR'
    // submitConversion()
})

const chartData = ref({})

// Call the event handler when the selection changes



const fromCurrency = ref('');
const toCurrency = ref('');
const fromCurrencyError = ref(false);
const toCurrencyError = ref(false);
const loadingState = ref(0);

const statusMessage = computed(() => {
    if (loadingState.value === 1) {
        return t('loading')
    } else if (loadingState.value === 0) {
        return t('selectMsg');
    }
})


const data = ref([]);
const validateInput = () => {
    fromCurrencyError.value = fromCurrency.value.length < 3 || !currenciesList.includes(fromCurrency.value.toUpperCase());
    toCurrencyError.value = toCurrency.value.length < 3 || !currenciesList.includes(toCurrency.value.toUpperCase());
};


const renderGraph = () => {
    loadingState.value = 2;
    chartData.value = {
        chartOptions: {
            chart: {
                id: "vuechart-example",
            },
            xaxis: {
                categories: Object.keys(data.value),
            },
            stroke: {
                colors: ["#1f2675"]
            },
            responsive: [
                {
                    breakpoint: 500,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false
                            }
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        },
        series: [
            {
                name: "Price",
                data: Object.keys(data.value).map(x => data.value[x][selectedDataType.value]),
            }
        ],
    }
}

const submitConversion = () => {
    validateAPIKey();
    if (apiKeyError.value) return;
    // selectedDataType.value = defaultView
    loadingState.value = 1;
    statusMessage.value = `Loading...`
    console.log(`Convert ${fromCurrency.value} to ${toCurrency.value}`);
    const url = `${BASE_URL}&from_symbol=${fromCurrency.value.toUpperCase()}&to_symbol=${toCurrency.value.toUpperCase()}&apikey=${apiKey.value}`
    axios.get(url).then(res => {
        data.value = res.data['Time Series FX (Daily)']
        renderGraph()
        userStore.stackHistory(`${fromCurrency.value.toUpperCase()} -> ${toCurrency.value.toUpperCase()}`)
    }).catch(err => {
        debugger
    })
    // data.value = mockData// res.data['Time Series FX (Daily)']
    // renderGraph()
    // userStore.stackHistory(`${fromCurrency.value.toUpperCase()} -> ${toCurrency.value.toUpperCase()}`)
    // mockData
};
watch(selectedDataType, renderGraph);
</script>
  
<style scoped lang="scss">
.currency-converter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .main-content {
        width: 90%;
        padding: 2rem;
    }
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

label {
    margin-top: 10px;
}

input {
    margin: 5px 0;
    padding: 5px;
}

.error-message {
    color: red;
    margin-top: 5px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
  