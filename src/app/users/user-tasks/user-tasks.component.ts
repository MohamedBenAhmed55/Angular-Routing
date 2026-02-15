import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit{
  // userId = input.required<string>();
  userName = '';
  private usersService = inject(UsersService)
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);

  ngOnInit(): void {
    // observables you can subscribe to.
    console.log(this.activatedRoute)
    // a snapshot contains actual values but since its in ngOnInit here it will not be re-exectued
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'))
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName = this.usersService.users.find(u => u.id === paramMap.get('userId'))?.name || ''
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
