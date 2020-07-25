import { Component, OnInit } from '@angular/core';
import { ExploreBrowseService } from 'src/app/shared/explore-browse.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  discovers:any=[];
  cardImg:boolean = false;
  headerImg:boolean = false;
  forValue  = 'explore';
  constructor(private explore:ExploreBrowseService,private toastr: ToastrService,
      private router:Router) { }

  ngOnInit() {
    this.explore.getAllDiscover().subscribe(
      res =>{
        console.log(res.data)
        this.discovers = res.data
      },
      err=>console.log(err),
    )
    
  }
  onEditExp(id:number){
    this.router.navigate(['home/Explore/edit/',id])
  }
 

  deleteDis(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.explore.deleteDiscover(+id)
        .subscribe(
          res => {
            this.explore.getAllDiscover().subscribe(
              data=>this.discovers=data.data,
              err=>console.log(err)
            );
            this.toastr.warning('Deleted successfully', 'Explore has been Deleted');
          },
          err => {
            console.log(err);
          }
        )
    }
  }


}
