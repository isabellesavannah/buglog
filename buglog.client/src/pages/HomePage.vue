<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="container">
      <div class="row">
        <form class="form-inline" @submit.prevent="createBug()">
          <input type="text"
                 name="title"
                 id="title"
                 class="form-control"
                 placeholder="enter your bug"
                 v-model="state.newBug.title"
          />
          <input type="text"
                 name="description"
                 id="description"
                 class="form-control"
                 placeholder="enter your description"
                 v-model="state.newBug.description"
          />
          <button class="btn btn-secondary" type="submit">
            Create Bug
          </button>
        </form>
      </div>
      <div class="row">
        <Bug v-for="bug in state.bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Bug from '../components/Bugs'
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          router.push({ name: 'BugDetail' })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {
    Bug
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
