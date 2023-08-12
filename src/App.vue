<template>
    <main>
        <h1>VDT DEMO</h1>

        <p>This is a sample dashboard using Vue Data Table. You can add, edit,
            delete and view users.</p>

        <b-button variant="success" @click="showCreateForm()">
            ADD USER
        </b-button>

        <!-- TABLE 1 -->
        <h2>TABLE 1</h2>
        <vue-data-table v-bind="params1" :data="data" @userEvent="handleUserEvent" />

        <!-- TABLE 2 -->
        <h2>TABLE 2</h2>
        <vue-data-table v-bind="params2" :data="data" @userEvent="handleUserEvent" />

        <!-- MODAL DIALOG TO EDIT USERS -->
        <b-modal :title="title" ref="userForm" hide-footer>
            <form @submit.prevent="submitForm()">
                <b-form-group label="Name" label-for="name">
                    <b-form-input v-model="user.name" />
                </b-form-group>
                <b-form-group label="Email address" label-for="email">
                    <b-form-input v-model="user.email" type="email" />
                </b-form-group>
                <b-form-group label="Job" label-for="job">
                    <b-form-input v-model="user.job" />
                </b-form-group>
                <b-form-group label="Gender" label-for="gender">
                    <b-form-select :options="['Male', 'Female']" v-model="user.gender" />
                </b-form-group>
                <b-form-group label="Additional information" label-for="info">
                    <b-form-textarea v-model="user.info" rows="5" />
                </b-form-group>
                <b-form-group class="text-right">
                    <b-button variant="danger" class="mr-2">CANCEL</b-button>
                    <b-button variant="success" type="submit">SAVE</b-button>
                </b-form-group>
            </form>
        </b-modal>

        <!-- MODAL DIALOG TO VIEW USERS -->
        <b-modal :title="title" ref="userView" hide-footer>
            <div class="text-justify">
                <b>Name:</b> <span>{{ user.name }}</span><br />
                <b>Email:</b> <span>{{ user.email }}</span><br />
                <b>Job:</b> <span>{{ user.job }}</span><br />
                <b>Bio:</b> <span>{{ user.bio }}</span>
            </div>
        </b-modal>
    </main>
</template>

<script>
import users from './users.json'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            // user which will be edited or added
            user: {},
            title: 'UPDATE USER',

            // data for both tables
            data: users,

            // parameters for the first table
            params1: {
                sortingMode: 'single',
                columns: [
                    { key: 'name' },
                    { key: 'email', title: 'Email address' },
                    { key: 'job' },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        title: 'actions',
                    },
                ],
            },

            // parameters for the second table
            params2: {
                defaultPerPage: 50,
                columns: [
                    { key: 'name' },
                    { key: 'gender' },
                    { key: 'job' },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['view'] },
                        title: 'view',
                    },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['edit'] },
                        title: 'edit',
                    },
                    {
                        cssClass: 'minwidth',
                        component: 'vdt-actions',
                        componentProps: { actions: ['delete'] },
                        title: 'delete',
                    },
                ],
            },
        }
    },

    methods: {
        handleUserEvent(payload) {
            let user = payload.data
            switch (payload.action) {
                case 'delete':
                    this.showDeleteForm(user)
                    break
                case 'edit':
                    this.showEditForm(user)
                    break
                case 'view':
                    this.showUser(user)
                    break
            }
        },
        addUser(user) {
            user.id = this.data.length + 1
            this.data.unshift(user)
            this.showSuccessMessage('User added!')
        },
        deleteUser(user) {
            this.data = this.data.filter((u) => u.id != user.id)
        },
        updateUser(user) {
            let index = this.data.findIndex((u) => u.id == user.id)
            this.data.splice(index, 1, user)
            this.showSuccessMessage('User updated!')
        },
        showUser(user) {
            this.user = { ...user }
            this.title = user.name
            this.$refs['userView'].show()
        },
        showEditForm(user) {
            this.title = 'UPDATE USER'
            this.user = { ...user }
            this.$refs['userForm'].show()
        },
        showCreateForm() {
            this.title = 'CREATE USER'
            this.user = {
                name: '',
                email: '',
                job: '',
                gender: '',
                info: '',
            }
            this.$refs['userForm'].show()
        },
        showDeleteForm(user) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You are about to delete this user!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteUser(user)
                    this.showSuccessMessage('User deleted!')
                }
            })
        },
        showSuccessMessage(message) {
            Swal.fire({
                title: 'SUCCESS!',
                text: message,
                icon: 'success',
                position: 'bottom-end',
                toast: true,
                timer: 3000,
                showConfirmButton: false,
            })
        },
        submitForm() {
            const user = this.user
            this.$refs['userForm'].hide()
            if (user.id != null) this.updateUser(user)
            else this.addUser(user)
        },
    },
}
</script>

<style type="text/css">
body {
    font-family: Arial;
}

main {
    margin: 1px auto;
    padding: 32px;
    display: block;
    max-width: 1200px;
}

.minwidth {
    width: 1px;
    text-align: center;
}

h1 {
    text-align: center;
    margin-bottom: 4rem;
}

main>h2 {
    margin-top: 3rem;
}
</style>