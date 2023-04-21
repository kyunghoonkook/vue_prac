//저장장소
//저장키
//저장하기
var STORAGE_KEY = "todos-vuejs";
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) )
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

//해당되는 내용말 걸러지도록하는 filter
var filters = {
    all: function(todos) {
        return todos
    }
}


new Vue({
  el: ".todoapp",
  data: {
     //저장장소 가져오기
    todos: todoStorage.fetch(),
    newTodo: "",
    visible:"all"
  },
  computed:{
      filterTodos:function(){
          return filters[this.visible](this.todos)
      }
  },
  methods:{
      addTodo:function(){
          var value= this.newTodo;
          if(!value){
              return
          }
          this.todos.push({
              id:todoStorage.uid++,
              title:value,
              completed:false
          })
          this.newTodo=""
      },
      removeTodo:function(todo){
          //todo가 들어있는 배열의 위치를 알아서 그 위치에 있는 내용을 제거
          this.todos.splice(this.todos.indexOf(todo),1)
      }
  }
});