<template>
  <div class="wrapper">
    <div class="mt-6 mb-4 flex justify-end">
      <div class="flex">
        <form @submit.prevent="handleSubmit" method="post">
          <select
            @change="selectCol($event)"
            name="selectColumn"
            id=""
            v-model="form.columnName"
          >
            <option value="date">Дата</option>
            <option value="title">Название</option>
            <option value="quantity">Количество</option>
            <option value="distance">Расстояние</option>
          </select>
          <select name="selectType" id="" v-model="form.type">
            <option value="equal">Равно</option>
            <option value="like">Содержит</option>
            <option value="more">Больше</option>
            <option value="less">Меньше</option>
          </select>
          <input
            v-show="this.isColumnDate == false"
            type="text"
            name="filter"
            v-model="form.value"
          />
          <input
            type="date"
            v-show="this.isColumnDate == true"
            name="filter"
            v-model="form.value"
          />
          <input class="submit" type="submit" value="Фильтрация" />
        </form>
      </div>
    </div>
    <table>
      <tr>
        <th>Дата</th>
        <th @click="sortByTitle">
          <div class="flex justify-center cursor-pointer items-center">
            <p>Название</p>
            <img src="/sort.png" alt="" />
          </div>
        </th>
        <th @click="sortByQuantity">
          <div class="flex justify-center cursor-pointer items-center">
            <p>Количество</p>
            <img src="/sort.png" alt="" />
          </div>
        </th>
        <th @click="sortByDistance">
          <div class="flex justify-center cursor-pointer items-center">
            <p>Расстояние</p>
            <img src="/sort.png" alt="" />
          </div>
        </th>
      </tr>
      <tr v-for="item in paginatedUser" :key="item.title">
        <td>{{ new Date(item.date).toLocaleDateString("ru-RU") }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.distance }}</td>
      </tr>
    </table>
    <div class="pagination">
      <div
        class="page"
        :class="{ activePage: page === startPage }"
        v-for="page in pages"
        :key="page"
        @click="toPage(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isColumnDate: false,
      usersPerPage: 5,
      startPage: 1,
      form: {
        columnName: "",
        type: "",
        value: "",
      },
    };
  },
  computed: {
    list() {
      return this.$store.getters["list"];
    },
    pages() {
      return Math.ceil(this.$store.getters["list"].length / 5);
    },
    paginatedUser() {
      let fromPage = (this.startPage - 1) * this.usersPerPage;
      let toPage = fromPage + this.usersPerPage;
      return this.$store.getters["list"].slice(fromPage, toPage);
    },
  },
  created() {
    this.$store.dispatch("fetchList");
  },
  methods: {
    toPage(num) {
      this.startPage = num;
    },
    async sortByTitle() {
      await this.$store.commit("sortByTitle");
    },
    async sortByQuantity() {
      await this.$store.commit("sortByQuantity");
    },
    async sortByDistance() {
      await this.$store.commit("sortByDistance");
    },
    handleSubmit: async function () {
      console.log(this.form);
      const formData = this.form;
      await this.$store.dispatch("fetchListByFilter", formData);
    },
    selectCol(event) {
      if (event.target.value == "date") {
        this.isColumnDate = true;
      } else {
        this.isColumnDate = false;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 1400px;
  margin: 0 auto;
  padding: 0;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th:last-child,
td:last-child {
  border-right: none;
}
th {
  text-align: center;
}
th img {
  width: 20px;
  height: 20px;
}
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.page {
  padding: 8px 16px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.page:hover,
.activePage {
  background: #004691;
  color: #fff;
  cursor: pointer;
}
select,
input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
}
input.submit {
  background: #004691;
  color: #fff;
}
input.submit:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
