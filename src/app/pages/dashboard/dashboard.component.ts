import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  users: IUser[] = [];

  // takeAllUsers(){
  //   new Promise((resolve, reject) => {
  //     this.usersService.foundAllUsers().subscribe.

  //   }
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
