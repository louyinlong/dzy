import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cp } from 'src/cp';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  cpName: AbstractControl;
  cpid: AbstractControl;
  cpprice: AbstractControl;
  cpusers$: Observable<Cp>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentcpusers: Cp;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'cpid': [''],
      'cpName': [''],
      'cpprice': [''],
    });
    this.cpid = this.myForm.controls['cpid'];
    this.cpName = this.myForm.controls['cpName'];
    this.cpprice = this.myForm.controls['cpprice'];
  }
  /*界面初始化*/
  ngOnInit(): void {
    this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
  }

  search() {
    if (this.cpid.value) {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers/' + this.cpid.value);
    } else {
      this.cpusers$ = <Observable<Cp>>this.httpClient.get(this.baseUrl + 'cpusers');
    }
  }

  add() {
    this.httpClient.post(this.baseUrl + 'cpuser', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功');
        }
      }
    )
  }

  select(u: Cp) {
    this.currentcpusers = u;
    this.myForm.setValue(this.currentcpusers);
  }

  delete() {
    if (!this.currentcpusers) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'cpuser/' + this.currentcpusers.cpid).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentcpusers) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'cpuser', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
          }
        }
      )
    }
  }

}



