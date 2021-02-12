<template>
    <v-data-table
        :headers="headers"
        :items="notas"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Mi CRUD</v-toolbar-title>
                
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary" dark
                            class="mb-2" v-bind="attrs" v-on="on"
                        >
                            Nueva Nota
                        </v-btn>
                    </template>
                
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.descripcion"
                                            label="Descripcion"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancelar
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save"
                            >
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="headline">Estas seguro de eliminar esta nota?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import {mapState} from 'vuex';
import Data from "@/api/Data";

    export default {
        data() {
            return {
                dialog: false,
                dialogDelete: false,
                headers: [
                    { text: 'id', value: 'id'},
                    { text: 'descripcion',sortable: true, value: 'descripcion'},
                    { text: 'Acciones', value: 'action', sortable: false },
                ],
                editedIndex: -1,
                editedItem: {
                    id:0,
                    descripcion:'',
                    usuario_id:0
                },
                defaultItem: {
                    id:0,
                    descripcion:'',
                    usuario_id:0
                },
            }
        },
        computed: {
            ...mapState('sesion', {user: 'user'}),

            formTitle () {
                return this.editedIndex === -1 ? 'Nueva nota' : 'Editar Nota'
            },
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
        },
        props: {
            notas: {
                Type: Array,
                default: () => ([]),
            },
        },
        methods: {
            editItem (item) {
                this.editedIndex = this.notas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.notas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.deleteNota(this.notas[this.editedIndex].id);
                this.notas.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    this.editedItem.usuario_id = this.user.data.id
                    this.editNota(this.editedItem)
                    Object.assign(this.notas[this.editedIndex], this.editedItem)
                    this.close()
                } else {
                    this.editedItem.usuario_id = this.user.data.id
                    this.addNota(this.editedItem);
                }
            },

            addNota(data) {
                delete data.id;
                Data().post(`/notas`,{data:data}).then((response) => {
                    this.editedItem.id = response.data.id;
                    this.notas.push(this.editedItem);
                    this.close()
                });
            },

            deleteNota(id) {
                Data().delete(`/notas/${id}`);
            },

            editNota(data) {
                Data().post(`/notas/${data.id}`,{data:data});
            },
        },
    }
</script>
