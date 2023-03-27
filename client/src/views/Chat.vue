<template>
    <div v-if="this.$store.state.user" class="content">
        <!-- left bar -->
        <div class="container-left">
            <h2 class="users-header">Connected users</h2>
            <div v-if="this.connectedUsers" class="users">
                <div v-for="user in connectedUsers.filter((us) => us.id === this.$store.state.user.id)" :key="user" class="user">
                    <div>
                        <div class="logo"></div>
                        <div class="user-text">
                            <h3 :class="user.id === this.$store.state.user.id ? 'me' : 'notme'">{{ user.name }}</h3>
                        </div>
                    </div>
                </div>
                <div v-for="user in connectedUsers.filter((us) => us.id !== this.$store.state.user.id)" :key="user" class="user">
                    <div>
                        <div class="logo"></div>
                        <div class="user-text">
                            <h3 :class="user.id === this.$store.state.user.id ? 'me' : 'notme'">{{ user.name }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-users" v-if="!this.connectedUsers">
                <h2>No users...</h2>
            </div>
        </div>
        

        <!-- right bar -->
        <div class="container-right">
            <div class="header">
                <div>
                    <h3>Room: </h3>
                    <h2>{{ room }}</h2>
                </div>
                <button @click="logout" class="logout">Logout</button>
            </div>
            <div class="main">
                <div class="welcome-messages">
                    <div v-for="message in welcomeMessages" :key="message" class="welcome-message">
                        <h2>{{ message }}</h2>
                    </div>
                </div>

                <div class="date">
                    <div class="line"></div>
                    <h2>Today</h2>
                    <div class="line"></div>
                </div>

                <div class="chat">
                    <div v-for="message in messages" :key="message.id" class="sms">
                        <div>
                            <!-- if message was sent from this acc don't show name -->
                            <h3 :class="message.userName === this.name ? 'mine' : 'notmine'">{{ message.userName }}</h3>
                            <h4>{{ message.text }}</h4>
                        </div>
                        <h4 class="time">{{ message.time }}</h4>
                    </div>
                </div>
                <div class="message">
                    <input v-model="text" @keyup.enter="message" placeholder="Write a message..." class="message" type="text">
                </div>
            </div>
        </div>
    </div>
    <!-- login -->
    <div v-else>
        <div class="background_authoriz">
         <div class="main-content_authoriz">
             <div class="container_authoriz">
                 <div class="header-block_authoriz">
                     <h2>OwnChat</h2>
                 </div>
 
                 <form @submit.prevent="handleSubmit()" class="form-box_authoriz">
                     <h1>Login to Chat</h1>
                     <!-- INPUTS -->
                     <div class="inputs_authoriz">
                         <input v-model="name" type="text" placeholder="Your name..." required>
                         <input v-model="room" type="text" placeholder="Room..." required>
                     </div>
                     
                     <div :class="this.name && this.room ? 'active' : 'notactive'" class="authoriz-btn">
                         <button type="submit">Log In</button>
                     </div>
                 </form>
             </div>
         </div>
     </div>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data() {
        return {
            // for button activity
            name: '',
            room: '',

            // right bar
            text: '',
            messages: [],
            userId: '',

            // left bar
            connectedUsers: [],
            welcomeMessages: []
        }
    }, 
    methods: {
        // on creating user (login part)
        handleSubmit() {
            if (this.name != '') {
                const user = {
                    name: this.name,
                    room: this.room,
                    id: null
                }
                // socket server connection
                this.socketInstance = io('http://localhost:3000')

                // user verify
                this.socketInstance.on('connect', () => {
                    // getting user's socket.id
                    user.id = this.socketInstance.id
                    // set a room
                    this.socketInstance.emit('setUserRoom', user)
                    // set user in vuex
                    this.$store.commit('setUser', user) 
                })

                this.socketInstance.on('newMessage', data => {
                    this.welcomeMessages.push(data)
                })

                // update users
                this.socketInstance.on('updateUsers', data => {
                     this.connectedUsers = data
                })

                // getting messages
                this.socketInstance.on('message:received', (data) => {
                    // if user's message room parameter === this room => get this message
                    if (data.room === this.$store.state.user.room) {
                        // .concat: messages array + data
                        this.messages = this.messages.concat(data)
                    }
                })
            }
        },
        // on click to 'logout button'
        logout() {
            // disconnect from socket server
            this.socketInstance.emit('disconnectUser', this.$store.state.user)
            this.connectedUsers = []
            this.messages = []
            this.welcomeMessages = []
            // vuex
            this.$store.commit('leave')
            // added page reload because it was en error when user leaves a page (not correct welcome messages)
            location.reload()
        },
        // on creating new message
        message() {
            // a form for message
            const message = {
                time: new Date().getHours() + ':' + new Date().getMinutes() ,
                text: this.text,
                room: this.room,
                userId: this.$store.state.user.id,
                userName: this.$store.state.user.name
            }
            // on sending message push it into messages array   
            this.messages = this.messages.concat(message)
            // socket action on server
            this.socketInstance.emit('message', message)
            // clearing input field
            this.text = ''
        }
    }
}

</script>

<style scoped>

@import url(@/assets/reset.css);
@import url(@/assets/styles.css);

h3.me {
    color: #337be6;
}

</style>