<template>
  <div class="container-right">
    <div class="header">
        <div>
            <h3>Room: </h3>
            <h2>{{ room }}</h2>
        </div>
        <button @click="logout" class="logout">Logout</button>
    </div>
    <div class="main">
        <div class="date">
            <div class="line"></div>
            <h2>Today</h2>
            <div class="line"></div>
        </div>

        <div class="chat">
            <div v-for="message in messages" :key="message.id" class="sms sms-foreign">
                <div>
                    <h3>{{ message.user }}</h3>
                    <h4>{{ message.text }}</h4>
                </div>
                <h4 class="time">{{ message.time }}</h4>
            </div>
            <!-- <div class="sms sms-mine">
                <h3>{{ message.text }}</h3>
                <h4 class="time">{{ message.time }}</h4>
            </div> -->
        </div>
        <div class="message">
            <input v-model="text" @keyup.enter="message" placeholder="Write a message..." class="message" type="text">
        </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data() {
        return {
            text: '',
            messages: [],
            room: ''
        }
    },
    mounted() {
        this.room = this.$store.state.room
    },  
    methods: {
        logout() {
            this.$store.commit('leave', false)
        },
        message() {
            const message = {
                time: new Date().getHours() + ':' + new Date().getMinutes() ,
                text: this.text,
                user: this.$store.state.user
            }   
            this.messages = this.messages.concat(message)
            this.socketInstance.emit('message', message)
            this.text = ''
        }
    }
}
</script>
