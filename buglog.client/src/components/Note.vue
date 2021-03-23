<template>
  <div class="Note">
    <div class="card" style="width: 18rem;">
      <!-- <img class="card-img-top" src="bug.creator.picture" alt="Card image cap"> -->
      <div class="card-body">
        <h5 class="card-title">
          {{ note.body }}
        </h5>
        <p class="card-text">
          {{ note.updatedAt }}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Note',
  props: {
    note: Object
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state

    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>

</style>
