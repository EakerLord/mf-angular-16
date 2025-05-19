import { Injectable } from "@angular/core";
import { NewTaskData, TaskStatus, Task } from "../components/task/task.model";
@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks = [
    {
      id: 't1',
      lessonId: 'l1',
      title: 'Data biding',
      summary: 'Full example of data biding comming soon.',
      dueDate: '2025-12-31',
      status: 'OPEN'
    },
    {
      id: 't2',
      lessonId: 'l2',
      title: 'Directives',
      summary: 'Example of a structural directive called "*appAuth" and an attribute directive called "appSafeLink":',
      dueDate: '2025-12-31',
      status: 'DONE'
    },
    {
      id: 't3',
      lessonId: 'l3',
      title: 'Pipes',
      summary: 'Example of the inbuild DatePipe and a custom pipe named "temperature" that can accept up to two configuration attributes:',
      dueDate: '2025-12-31',
      status: 'IN_PROGRESS'
    },
    {
      id: 't4',
      lessonId: 'l4',
      title: 'Dependency Injection',
      summary: 'Full example of Dependency Injection comming soon.',
      dueDate: '2025-12-31',
      status: 'OPEN'
    },
    {
      id: 't5',
      lessonId: 'l5',
      title: 'RxJS',
      summary: 'Information, comparisons and examples of RxJS, observable pattern:',
      dueDate: '2025-12-31',
      status: 'OPEN'
    }
  ];

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
