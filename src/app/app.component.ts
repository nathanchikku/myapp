import { Component, ViewChild } from '@angular/core';
 
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
 
export interface UsersData {
  name: string;
  doc: string;
  id: number;
}
 
const ELEMENT_DATA: UsersData[] = [
  {id: 1, name: 'Sub-Activity-Name', doc: 'yes'},
  {id: 2, name: 'Sub-Activity-Name', doc: 'yes'},
  {id: 3, name: 'Sub-Activity-Name', doc: 'yes'},
  {id: 4, name: 'Sub-Activity-Name', doc: 'yes'}
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'doc', 'action'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
 
  constructor(public dialog: MatDialog) {}
 
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '750px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      doc:row_obj.doc
    });
    this.table.renderRows();``
    
  }
 
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
 
 
}
