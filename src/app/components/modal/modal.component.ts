import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Name</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="modal-body">

  <div class="row">
    <div class="col-4">Photo</div>
    <div class="col-8">
    <div> Birth: </div>
    <div> Birth Place: </div>
    <div> Gender: </div>
    <div> Known for: </div>
    <div> Also known as: </div>
  </div>

  <div class = "bio" style = 'margin-left: 10px;'> Biography <div>
  <div class = "bio_content"> This is his/her bio. </div>

  </div>
  </div>

  `
})

export class ModalComponentContent {
  @Input() name: any;

  public vid: any = [];
  public det: any = [];
  public cast: any = [];
  public rev: any = [];
  public sim: any = [];
  public rcmd: any = [];

  constructor(public activeModal: NgbActiveModal, private route: ActivatedRoute, private http: HttpClient, private postService: PostsService) {}
  
  ngOnInit(): void { 
    this.fetch();
 }

 fetch() {
   
  var id = this.route.snapshot.params['id'];
  var media_type = this.route.snapshot.params['media_type'];

  this.postService.getAll(id,media_type).subscribe(res => {
    console.log(res);
    this.vid = res.v;
    this.det= res.d;
    this.cast = res.c;
    this.rev = res.r;
    this.sim = res.s;
    this.rcmd = res.rd;
  });
}

}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {


  public vid: any = [];
  public det: any = [];
  public cast: any = [];
  public rev: any = [];
  public sim: any = [];
  public rcmd: any = [];



  constructor(private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient, private postService: PostsService) {}

  open() {
    const modalRef = this.modalService.open(ModalComponentContent);
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit(): void { 
     this.fetch();
  }

  fetch() {
    var id = this.route.snapshot.params['id'];
    var media_type = this.route.snapshot.params['media_type'];
  
    this.postService.getAll(id,media_type).subscribe(res => {
      console.log(res);
      this.vid = res.v;
      this.det= res.d;
      this.cast = res.c;
      this.rev = res.r;
      this.sim = res.s;
      this.rcmd = res.rd;
    });
  }

}



