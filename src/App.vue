<template>
  <v-app style="margin: 30px">
    <v-card>
      <!--panel header-->
      <v-card-title class="headline primary" primary-title style="color: white">
        <v-col
          ><v-toolbar-title class="text-center"
            ><v-app-bar-nav-icon color="white" />Todo-List</v-toolbar-title
          ></v-col
        >
        <th style="margin: 20px">
          <addTask
            dialogType="Add"
            :list-of-tasks="listOfTasks"
            @create-new-task="addTask($event)"
          />
        </th>
      </v-card-title>
      <!--panel body-->
      <v-simple-table style="margin: 20px">
        <template v-slot:default>
          <!--table header-->
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Priority</th>
              <th scope="col">Is complete</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listOfTasks"
              v-bind:key="index"
              :task="item"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.date | formatDate }}</td>
              <td>{{ item.row }}</td>
              <td>
                <v-checkbox
                  v-model="item.complete"
                  color="primary"
                  @change="isComplete(index)"
                ></v-checkbox>
              </td>
              <td>
                <div v-if="!item.complete">
                  <v-btn color="primary" class="mr-4"
                    ><addTask
                      dialogType="UPDATE"
                      :list-of-tasks="listOfTasks"
                      @edit-the-task="editTask($event, index)"
                  /></v-btn>
                </div>
                <div>
                  <v-btn color="error" class="mr-4" @click="deleteTask(index)"
                    ><v-icon small>mdi-close-circle-outline</v-icon> DELETE
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-app>
</template>

<script>
import addTask from "./components/addTask.vue";

export default {
  name: "TaskTable",
  data: () => ({
    listOfTasks: [],
  }),

  components: {
    addTask,
  },

  methods: {
    addTask: function (theNewTask) {
      this.listOfTasks.push(theNewTask);
      this.$toasted.success("Task added succesfully", {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 5000,
      });
    },
    editTask: function (edit, index) {
      if (edit.description !== null) {
        this.listOfTasks[index].description = edit.description;
      }
      if (edit.date !== null) {
        this.listOfTasks[index].date = edit.date;
      }
      if (edit.row !== null) {
        this.listOfTasks[index].row = edit.row;
      }
      this.$toasted.success("Task updated succesfully", {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 5000,
      });
    },
    deleteTask: function (index) {
      this.listOfTasks.splice(index, 1);
      this.$toasted.success("Task deleted succesfully", {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 5000,
      });
    },
  },
};
</script>
