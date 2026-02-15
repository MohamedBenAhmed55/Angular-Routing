import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  order?: 'asc' | 'desc'
  private tasksService = inject(TasksService)
  userTasks = computed(() => this.tasksService.allTasks().filter(t => t.userId === this.userId()));

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParamMap.subscribe({
      next: (params) => (this.order = params.get('order') as 'asc' | 'desc')
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe)
  }
}
