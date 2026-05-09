<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-vue-next'

interface Todo {
  id: number
  content: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodo = ref('')
const API_URL = 'http://localhost:3000/todos'

// Fetch todos
const fetchTodos = async () => {
  const res = await fetch(API_URL)
  todos.value = await res.json()
}

// Add todo
const addTodo = async () => {
  if (!newTodo.value.trim()) return
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: newTodo.value })
  })
  if (res.ok) {
    newTodo.value = ''
    fetchTodos()
  }
}

const toggleTodo = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH'
    });

    if (res.ok) {
      // Re-fetch the list to see the update
      await fetchTodos();
    }
  } catch (err) {
    console.error("Failed to toggle todo:", err);
  }
}

// Delete todo
const deleteTodo = async (id: number) => {
  await fetch(id === -1 ? API_URL : `${API_URL}/${id}`, { method: 'DELETE' })
  fetchTodos()
}

onMounted(fetchTodos)
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 class="text-3xl font-bold text-slate-800 mb-8">My Tasks</h1>

      <!-- Input -->
      <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
        <input v-model="newTodo" placeholder="What needs to be done?"
          class="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button class="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition">
          <Plus :size="24" />
        </button>
      </form>

      <!-- List -->
      <ul class="space-y-3">
        <li v-for="todo in todos" :key="todo.id"
          class="flex items-center justify-between p-4 bg-slate-50 rounded-xl group transition hover:bg-slate-100">
          <div class="flex items-center gap-3">
            <button class="transition-transform active:scale-90 cursor-pointer" @click="toggleTodo(todo.id)">
              <CheckCircle v-if="todo.completed" class="text-emerald-500 fill-emerald-50" :size="24" />
              <Circle v-else class="text-slate-300 group-hover:text-indigo-400" :size="24" />
            </button>
            <span :class="{ 'line-through text-slate-400': todo.completed }" class="text-slate-700">
              {{ todo.content }}
            </span>
          </div>
          <button @click="deleteTodo(todo.id)" class="text-slate-400 hover:text-red-500 transition cursor-pointer">
            <Trash2 :size="18" />
          </button>
        </li>
      </ul>

      <p v-if="todos.length === 0" class="text-center text-slate-400 mt-4 text-sm">
        No tasks yet. Add one above!
      </p>
    </div>
  </div>
</template>