import { Component, OnInit } from '@angular/core';
import Dexie, { Table, liveQuery } from 'dexie';

export interface TodoList {
  id?: number;
  title: string;
}

class DB extends Dexie {
  todoLists!: Table<TodoList, number>;
  constructor() {
    super('federate');

    this.version(3).stores({
      todoLists: '++id',
    });
  }
}
export const db = new DB();

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  title = 'welcome';
  dataCount: number = 0;
  todoLists$ = liveQuery(() => db.todoLists.toArray());

  ngOnInit(): void {
    this.todoLists$.subscribe((items: TodoList[]) => {
      this.dataCount = items.length;
      console.log(items.length);
    });
  }

  getStorage() {
    this.title = localStorage.getItem('shared') || 'nothing';
    db.todoLists.add({
      title: this.title,
    });
  }
}
