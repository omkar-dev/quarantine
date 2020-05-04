import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  postsArray: any
  jsonURL: string;

  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.jsonURL = '../../../assets/posts.json';
    // this.postsArray = [
    //   {
    //     "postTitle" : "Food Request",
    //     "description" : "Provide food kits"
    //   },
    //   {
    //     "postTitle" : "Medical Help",
    //     "description" : "Feeling uneasy. Need some medication"
    //   }
    // ]
    this.http.get(this.jsonURL).subscribe(res=>{
      console.log("response",res)
      this.postsArray = res
    })

  
  }

  


  resolve(data)
  { 
    let body = {
        "resolve" : true,
        "delete"  : "",
        "help_id" : "",
        "user_id" : ""
        }

        let options= {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    
    console.log("data",data)  
    if(!data.resolve)
    {
        this.http.put(this.jsonURL,body,options).subscribe(res=>{
          console.log("after put",res)
        })
    }  
    else
    {
      console.log("This matter is already resolved")
    }
  }

  delete(data)
  {
    console.log("data",data)
    let body = {
      "resolve" : "",
      "delete"  : true,
      "help_id" : "",
      "user_id" : ""
      }

      let options= {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }

      this.http.put(this.jsonURL,body,options).subscribe(res=>{
        console.log("after put",res)
      })
  }



}