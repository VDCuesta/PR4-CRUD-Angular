import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { PostStateService } from '../post-state.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-actualizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './actualizacion.component.html',
  styleUrl: './actualizacion.component.css'
})
export class ActualizacionComponent {
  
  private id = Number(this.activatedRoute.snapshot.params['id']);
  submitted = false;
  post: Post | null = null;
  
  editForm: FormGroup = new FormGroup ({
    title: new FormControl('', Validators.required),
    body: new FormControl ('', Validators.required)
  });  

  constructor(
              private activatedRoute: ActivatedRoute,
              public postService: PostService,
              private postStateService: PostStateService
              ){}

  get f(){
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.postStateService.posts$.subscribe(posts => {
      const foundPost = posts.find(p => p.id === this.id);
      this.post = foundPost || null;  // If not found, set to null
      if (this.post) {
        this.editForm.controls['title'].setValue(this.post.title);
        this.editForm.controls['body'].setValue(this.post.body);
      }
    });
  }

  onReset(){
    this.submitted = false;
    this.editForm.reset();
  }

  onSubmit() {
    const updatedPost: Post = {
      id: this.id,
      title: this.editForm.get('title')?.value,
      body: this.editForm.get('body')?.value,
    };
  
    this.postService.update(this.id, updatedPost).subscribe(
      (updatedPost) => {
        if (updatedPost) {
          alert('Post updated successfully:' + JSON.stringify(updatedPost, null, 4));
  
          // Update posts in the state
          this.postStateService.posts$.pipe(first()).subscribe(
            (currentPosts) => {
              const updatedPosts = currentPosts.map(p => (p.id === updatedPost.id ? updatedPost : p));
              this.postStateService.updatedPosts(updatedPosts);
            }
          );
        }
      },
      (error) => {
        console.error('Error during update:', error);
      }
    );
  }
}
