import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { PostStateService } from '../post-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vista-individual',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vista-individual.component.html',
  styleUrl: './vista-individual.component.css'
})
export class VistaIndividualComponent {

  private id = Number(this.activatedRoute.snapshot.params['id']);
  post: Post | null = null;

  constructor(
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private postStateService: PostStateService
              ){}

  ngOnInit(): void{
    this.postStateService.posts$.subscribe(posts => {
      const foundPost = posts.find(p => p.id === this.id);
      this.post = foundPost || null;
    })
  }
}
