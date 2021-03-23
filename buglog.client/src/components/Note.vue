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
        <button type="button btn-danger" class="close" aria-label="Close">
          <span @click.prevent="deleteNote()" aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Note',
  props: {
    note: Object
  },
  setup(props) {
    const state = reactive({
      activeNote: computed(() => AppState.activeNote)
    })
    return {
      state,
      async deleteNote() {
        try {
          await notesService.deleteNote(props.note)
        } catch (error) {
          logger.log(error)
        }
      }

    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>

</style>
