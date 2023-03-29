<script setup lang="ts">
import { context } from 'esbuild';

const emit = defineEmits(['onClick'])
const props = defineProps<{
  CountryName: string;
  Active: boolean;
  ImageUrl?: string;
  Slug: string;
}>();

function onClickCountry () {
  emit('onClick', props.Slug)
}
</script>

<template>
  <div>
    <div
      class="flex justify-start items-center rounded shadow px-5 py-4 cursor-pointer mb-3"
      @click="onClickCountry()"
    >
      <nuxt-img
        :src="
          props.ImageUrl
            ? props.ImageUrl
            : 'https://cdn.airalo.com/assets/images/svg/Logo_light.svg'
        "
        width="37"
        height="28"
        loading="lazy"
        class="mr-5"
      />
      <p class="text-normal leading-tabs font-medium">
        {{ CountryName }}
      </p>
      <div
        :class="[
          'ml-auto',
          {
            'text-grey': !Active,
            'text-primary': Active,
          },
        ]"
      >
        <nuxt-icon
          :name="!Active ? 'arrow_close' : 'arrow_open'"
          class="flex justify-center items-center w-icon h-icon text-icon overflow-hidden"
        />
      </div>
    </div>
  </div>
  <slot package></slot>
</template>
