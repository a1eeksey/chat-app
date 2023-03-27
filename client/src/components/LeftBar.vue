<template>
  <div class="container-left">
    <!-- <div class="header-part">
        <input type="text" placeholder="Search...">
    </div> -->
    <div v-if="users" class="users">
        <div v-for="user in users" :key="user" class="user">
            <div>
                <!--logo-->
                <img src="https://kids.love.science/img/credits/ran.png" alt="">
                <div class="user-text">
                    <h3>{{ user }}</h3>
                    <h2>{{ text }}</h2>
                </div>
            </div>
            <!--time-->
            <h2>{{ time }}</h2>
        </div>
    </div>
    <div class="no-users" v-if="users != []">
        <h2>No users...</h2>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
}
</script>
