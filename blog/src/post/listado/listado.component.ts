import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { PostStateService } from '../post-state.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  posts: Post[] =[];

  constructor(
              private postService: PostService,
              private postStateService: PostStateService
              ){}
  
  ngOnInit(): void {
    this.postStateService.posts$.subscribe((posts) => {
      this.posts = posts;
    });

    this.getAllPosts();
  }

  getAllPosts(){
    this.postService.getAll()
                    .subscribe(
                      (posts) => {
                        this.postStateService.updatedPosts(posts);
                      }
                    );
    // .subscribe(post =>  this.posts = post);
  }

  deletePost(post: Post){
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      this.postStateService.updatedPosts(this.posts);
    }

    this.postService.delete(post.id);
  }

}
