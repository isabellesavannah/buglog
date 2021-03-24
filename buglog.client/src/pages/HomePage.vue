<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <button class="btn btn-secondary m-3" @click="filterBugs()">
            Show All Open Bugs
          </button>
          <button class="btn btn-secondary m-3" @click="filterClosedBugs()">
            Show All Closed Bugs
          </button>
        </div>
        <div class="card">
          <form class="form-inline m-3" @submit.prevent="createBug()">
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
      filterOpen: computed(() => AppState.bugs.filter(b => !b.closed)),
      filterClosed: computed(() => AppState.bugs.filter(b => b.closed)),
      newBug: {}
    })
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      state,
      async createBug() {
        try {
          const id = await bugsService.createBug(state.newBug)
          // gregslist cars page, missing tiny det
          router.push({ name: 'BugDetail', params: { id: id } })
        } catch (error) {
          console.error(error)
        }
      },
      async filterBugs() {
        AppState.bugs = state.filterOpen
      },
      async filterClosedBugs() {
        AppState.bugs = state.filterClosed
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
