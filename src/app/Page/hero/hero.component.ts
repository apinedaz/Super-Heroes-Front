import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/Model/Hero';
import { MatTableDataSource } from '@angular/material/table';
import { HeroService } from 'src/app/Service/hero.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit{

  public dataSource = new MatTableDataSource<Hero>();

  public titles = ['id','name','city','superpower','realName','edit','delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private heroService: HeroService, 
              private router : Router){

  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.heroService.getAll().subscribe((result: Hero[]) =>{
      this.dataSource = new MatTableDataSource<Hero>(result);
      this.dataSource.paginator = this.paginator;
    })
  }

  public search(value: Event){
    
    const valueSearch = (value.target as HTMLInputElement).value.toLocaleUpperCase();

    this.heroService.findWithString(valueSearch).subscribe((result : Hero[]) =>{
      this.dataSource = new MatTableDataSource<Hero>(result);
      this.dataSource.paginator = this.paginator;
    });

    if(valueSearch === '') this.getData();
  }

  public create(){
    this.router.navigate(['create']);
  }

  public edit(id : number){
    this.router.navigate(['edit/'+id.toString()]);
  }

  public delete(id: number){
    Swal.fire({title:'Delete',
    text:'Are you sure to delete?',
    icon:'question',
    confirmButtonText: 'Sure',
    showCancelButton: true,
    cancelButtonText: 'No'}).then(result =>{
      if(result.isConfirmed){
        this.heroService.delete(id).subscribe();
        this.getData();
      }else{
        Swal.close();
      }
    });
  }
}
