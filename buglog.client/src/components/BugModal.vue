<template>
  <div class="modal createBugModal" :id="'createBugModal'" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
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
        <div class="modal-footer">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import router from '../router'
export default {
  name: 'CreateBugModal',
  setup() {
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
          const bug = await bugsService.createBug(state.newBug)
          // $('#createBugModal').modal('toggle')
          router.push({ name: 'BugDetail', params: { id: bug.id } })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
