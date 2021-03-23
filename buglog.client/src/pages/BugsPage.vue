<template>
  <div class="bugsDetailPage">
    <div class="row">
      <div class="col-12">
        <p>
          Status:
          <span v-if="!state.activeBug.closed" class="text-success">Open</span>
          <span v-else class="text-danger">Closed</span>
        </p>
        <div v-if="!state.bug.closed">
          <button @click.prevent="closeBug()">
            Close Bug
          </button>
        </div>
      </div>
    </div>

    <div class="col-12">
      <p>
        {{ state.bug.title }}
      </p>
      <p>
        {{ state.activeBug.description }}
      </p>
    </div>
    <div class="row">
      <Note v-for="note in state.note" :key="note.id" :note="note" />
    </div>
    <div class="text-right absolute top right p-2 z-2" v-if="state.activeBug.closed == false">
      <form class="form-inline" @submit.prevent="createNote(event)">
        <input
          type="text"
          name="note"
          id="note"
          class="form-control"
          placeholder="Bug Notes"
          aria-describedby="helpId"
          v-model="state.newNote.body"
        />
        <button class="btn btn-secondary" type="submit">
          Create Note
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
// import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Note from '../components/Note'
import { logger } from '../utils/Logger'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugsDetailPage',
  props: {

  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      bugStatus: '',
      bug: computed(() => AppState.activeBug),
      note: computed(() => AppState.notes),
      newNote: {},
      activeBug: computed(() => AppState.activeBug)
    })
    onMounted(() => {
      notesService.getAllNotesById(route.params.id)
      bugsService.getBugById(route.params.id)
    })
    return {
      state,
      async createNote() {
        // state.newNote.title = AppState.activeBug.id
        await notesService.createNote({ bug: route.params.id, body: state.newNote.body })
        state.newNote = {}
      },
      async closeBug() {
        try {
          if (confirm('do you want to delete?')) { await bugsService.closeBug(route.params.id, state.bugStatus) }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {
    Note
  }
}
</script>

<style lang="scss" scoped>

</style>
