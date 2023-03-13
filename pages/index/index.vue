<script setup lang="ts">
type ClickCountryPayload = {
  id: string;
  index: number;
};

const config = useRuntimeConfig();


const isPopuplarCountries = ref(true);
const preloader = ref(false);


function setIsPopuplarCountries(payload: boolean) {
  isPopuplarCountries.value = payload;
}

function setPreloaderView(payload: boolean) {
  preloader.value = payload;
}
</script>

<template>
  <div class="container mx-auto">
    <div v-if="preloader">
      <SharedLottieLoader />
    </div>

    <div class="mb-5">
      <h2 class="text-h2 leading-h2 tracking-h2 font-semibold">
        {{ isPopuplarCountries ? "Popular" : "All" }} Countries
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-2.5">
      <!-- You need to develop here -->
    </div>
    <div class="grid grid-cols-12 gap-7.5 mt-10">
      <div class="col-span-4 col-start-5">
        <button
          type="button"
          class="rounded shadow bg-primary text-CTA leading-button tracking-CTA text-white font-semibold pt-[17px] pb-[16px] w-full"
          @click.prevent="setIsPopuplarCountries(!isPopuplarCountries)"
        >
          {{
            isPopuplarCountries
              ? "SHOW ALL COUNTRIES"
              : "SHOW POPULAR COUNTRIES"
          }}
        </button>
      </div>
    </div>
  </div>
</template>
