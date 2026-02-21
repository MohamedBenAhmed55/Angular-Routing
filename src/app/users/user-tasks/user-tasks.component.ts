import {
  Component,
  // computed,
  // DestroyRef,
  inject,
  input,
  OnInit,
  // OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  // ActivatedRoute,
  RouterOutlet,
  RouterLink,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router'

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();

  // private activatedRoute = inject(ActivatedRoute);

  // Accessing Route Data In Components
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: data => {
  //       console.log(data)
  //     }
  //   })
  // }

  // userId = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name);

  // We can get rid of this if we're using a resolver to fetch the user name as a dynamic param
  // ngOnInit(): void {
  //   console.log('Input Data: ', this.message());
  //   // observables you can subscribe to.
  //   console.log(this.activatedRoute);
  //   // a snapshot contains actual values but since its in ngOnInit here it will not be re-exectued
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

// ResolveFn is generic so we should specify the type of data we're returning. In our case its a string (the user name).
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';
  return userName;
};
