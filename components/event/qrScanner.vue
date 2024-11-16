<script setup lang="ts">
import {useWebAppQrScanner} from "vue-tg";
import {QrCodeIcon} from "@heroicons/vue/24/solid";

const {$api} = useNuxtApp()

const qr = useWebAppQrScanner()
const expenseGroups = defineModel<Array<{
  data: Array<{name: string, amount: number}>,
  name: string
}>>()

var workingOn : number = 0

const appendFixedSpending = (name: string, count: number)=>{
  if(!expenseGroups.value){
    return;
  }
  expenseGroups.value[workingOn].data.push({
    name: name,
    amount: count
  })
}

const sendRequestFormat = async (rew_data: string) => {
  try {
    const response = await $api('/check', {
      method: "POST",
      body: {
        qrraw: rew_data
      }

    });
    return JSON.stringify(response);
  } catch (error) {
    console.error("Ошибка при отправке запроса:", error);
    return null;
  }


};


const handleQRScanning = () => {
  qr.showScanQrPopup({}, async (qrText: string) => {
    const data = await sendRequestFormat(qrText);
    const formattedData = reFormat(data);

    if(!expenseGroups.value){
      return
    }

    workingOn = expenseGroups.value.length

    expenseGroups.value.push({
      name: `Сканированный QR код ${expenseGroups.value.length + 1}`,
      data: []
    })

    formattedData.forEach((item: {name: string, price:number}) => {
      appendFixedSpending(item.name, item.price)
    })
  });
}
const reFormat = (rawData: string | null) => {
  try {
    const parsedData = JSON.parse(rawData as string);
    if (parsedData && parsedData.data && parsedData.data.json && parsedData.data.json.items) {
      const items = parsedData.data.json.items;
      const products = items.map((item: any) => ({
        name: item.name,
        price: item.price / 100, // Предполагая, что цена в копейках
      }));
      return products;
    } else {
      console.error("Некорректный формат данных QR-кода");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при разборе данных QR-кода:", error);
    return null;
  }
}

</script>

<template>
  <div class="w-full flex flex-row">
    <button @click=handleQRScanning class="bg-button w-full p-2 rounded-xl mt-2 mx-auto flex gap-2 justify-center"
            type="button">
      <QrCodeIcon class=" size-6 text-white"/>
      Сканировать QR код
    </button>
  </div>
</template>

<style scoped>

</style>