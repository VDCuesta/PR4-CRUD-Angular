import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostStateService {
  private postSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postSubject.asObservable();

  constructor() { }

  updatedPosts(posts: Post[]){
    this.postSubject.next(posts);
  }
}
