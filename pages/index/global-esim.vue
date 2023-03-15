<script setup lang="ts">
type ClickCountryPayload = {
  id: string;
  index: number;
};

const config = useRuntimeConfig();

const countries: any = ref([]);
const countryPackages: any = ref([]);
const isPopuplarCountries = ref(true);
const activeIndex = ref(-1);
const preloader = ref(false);

await useAsyncData(() => getCountries(), { watch: [isPopuplarCountries] });

async function getCountries() {
  try {
    const response: any = await $fetch(
      `${config.public.apiBase}/countries${
        isPopuplarCountries.value ? "?type=popular" : ""
      }`,
      {
        headers: {
          "accept-language": "en",
        },
      }
    );

    setCountries(response);
  } catch (error) {
    console.log({ error });
    setCountries([]);
  }
}

async function getPackagesByCountry(id: string) {
  try {
    const {
      data: {
        value: { packages },
      },
    }: any = await useFetch(`${config.public.apiBase}/countries/${id}`, {
      headers: {
        "accept-language": "en",
      },
      onResponse({ request, response, options }) {
        return response._data;
      },
    });

    if (packages) {
      setPackages(packages);
    }
  } catch (error) {
  } finally {
    setPreloaderView(false);
  }
}

async function clickCountry(payload: ClickCountryPayload) {
  setPreloaderView(true);
  await getPackagesByCountry(payload.id);
  seActiveIndex(payload.index);
}

function seActiveIndex(paylod: number) {
  activeIndex.value = paylod !== -1 ? paylod : -1;
}
function setIsPopuplarCountries(payload: boolean) {
  isPopuplarCountries.value = payload;
}
function setCountries(payload: any) {
  countries.value = payload;
}
function setPackages(payload: any) {
  countryPackages.value = payload;
}
function getPackageName(pack: any) {
  return pack.operator?.title;
}
function getPackageCountries(pack: any) {
  const countries = pack.operator?.countries;
  return countries.length >= 1
    ? countries.length
    : countries.length === 1
    ? countries[0].title
    : "";
}
function getPackageStyleTheme(pack: any) {
  return pack.operator?.style;
}
function getPackageStyleThemeGradient(pack: any) {
  const gradientStart = pack.operator?.gradient_start;
  const gradientEnd = pack.operator?.gradient_end;
  return `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 100%);`;
}
function getOperatorImageURL(pack: any) {
  return pack.operator?.image?.url;
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
      <div
        v-for="(country, index) in countries"
        :key="`local-countries-item-${index}`"
      >
        <ListCountry
          :CountryName="country.title"
          :ImageUrl="country.image.url"
          :Active="activeIndex === index"
          @click.prevent="
            clickCountry({
              id: country.id,
              index: index === activeIndex ? -1 : index,
            })
          "
        />
      </div>
      <div
        :class="[
          'py-5',
          {
            hidden: activeIndex === -1,
          },
        ]"
        :style="`grid-row-start: ${activeIndex + 2};`"
      >
        <div class="grid grid-cols-3 gap-7.5">
          <div
            v-for="(packageItem, packageIndex) in countryPackages"
            :key="`local-countries-item-package-${packageIndex}`"
          >
            <ListPackage
              :PackageName="getPackageName(packageItem)"
              :SupportedCountries="getPackageCountries(packageItem)"
              :Data="packageItem.data"
              :Validity="packageItem.validity"
              :Price="packageItem.price"
              :StyleTheme="getPackageStyleTheme(packageItem)"
              :StyleThemeGradient="getPackageStyleThemeGradient(packageItem)"
              :OperatorImageUrl="getOperatorImageURL(packageItem)"
            />
          </div>
        </div>
      </div>
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
