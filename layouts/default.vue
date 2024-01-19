<template>
  <main class="mx-auto w-10/12 px-10 py-15 text-center">
    <Logos mb-15 />
    <slot />
    <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      [Default Layout]
    </div>
  </main>
</template>

<style scoped>
  html {
  scroll-behavior: smooth;
}
</style>
