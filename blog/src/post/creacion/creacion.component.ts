import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { PostStateService } from '../post-state.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.css'
})
export class CreacionComponent implements OnInit {

  submitted = false;

  createForm: FormGroup = new FormGroup ({
    title: new FormControl('', Validators.required),
    body: new FormControl ('', Validators.required)
  });

  constructor(
              private activatedRoute: ActivatedRoute,
              public postService: PostService,
              private postStateService: PostStateService
              ){}

  ngOnInit(): void{}

  get f(){
    return this.createForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.createForm.invalid) {
      return;
    }
  
    const postToCreate: Post = this.createForm.getRawValue();
  
    this.createPost(postToCreate);
  }
  
  createPost(post: Post) {
    this.postService.create(post).subscribe(
      (createdPost) => {
        this.handlePostCreationSuccess(createdPost || post);
        this.postStateService.posts$.pipe(first()).subscribe(
          (currentPosts) => {
            const updatedPosts = [...currentPosts, createdPost || post];
            this.postStateService.updatedPosts(updatedPosts);
          }
        );
      },
      (error) => this.handlePostCreationError(error)
    );
  }
  
  handlePostCreationSuccess(createdPost: Post) {
  
    console.log('Post created successfully:', createdPost);
  
    alert('Post created ' + JSON.stringify(createdPost, null, 4));
  }
  
  handlePostCreationError(error: any) {

    console.error('Error during create:', error);
  }

  onReset(){
    this.submitted = false;
    this.createForm.reset();
  }

}
