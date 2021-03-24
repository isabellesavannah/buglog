<template>
  <div class="bug">
    <div class="col">
      <div class="card justify-content-center m-3" style="width: 18rem; height: 25rem;">
        <div class="card-body">
          <div class="row" v-if="bug.creator && bug.creator.name">
            <router-link :to="{name: 'BugDetail', params: {id: bug.id}}">
              <h5 class="card-title bg-secondary">
                {{ bug.title }}
              </h5>
              <p>
                {{ bug.description }}
              </p>
              <p>
                {{ bug.creator.name }}
              </p>
              <p>
                {{ new Date (bug.updatedAt).toDateString() }}
              </p>
              <img class="card-img-top" :src="bug.creator.picture" alt="Card image cap">
              <p>
                Status:
                <span v-if="!bug.closed" class="text-success">Open</span>
                <span v-else class="text-danger">Closed</span>
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Bug',
  props: {
    bug: Object
  },
  setup(props) {
    return {

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
