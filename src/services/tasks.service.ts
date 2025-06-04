import { Injectable } from "@angular/core";
import { NewTaskData, TaskStatus, Task } from "../components/task/task.model";
import { DUMMY_TASKS } from "../assets/dummy-data";
@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks = DUMMY_TASKS;

  activePermission: string = 'guest';

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getLessonTasks(lessonId: string) {
    return this.tasks.filter((task: Task) => task.lessonId === lessonId);
  }
  addTask(task: NewTaskData, lessonId: string) {
    this.tasks.push({
      id: new Date().getTime().toString(),
      lessonId: lessonId,
      title: task.title,
      summary: task.summary,
      dueDate: task.date,
      status: task.status
    });
    this.saveTasks();
  }
  removeTask(id: string) {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    this.saveTasks();
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks = this.tasks.map((task) => task.id === taskId ? { ...task, status: newStatus } : task);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Estructural directive method
  taskAuthentication(taskCode: boolean) {
    if (taskCode) {
      this.activePermission = 'fede';
    } else {
      this.activePermission = 'guest';
    }
  }
}
