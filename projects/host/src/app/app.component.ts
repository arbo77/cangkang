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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'host';
  dataCount: number = 0;

  todoLists$ = liveQuery(() => db.todoLists.toArray());

  ngOnInit() {
    this.todoLists$.subscribe((items: TodoList[]) => {
      this.dataCount = items.length;
    });
  }
}
