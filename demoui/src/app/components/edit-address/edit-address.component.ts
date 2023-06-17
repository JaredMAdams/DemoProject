import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { States } from 'src/app/enums/states.enum';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  public states = Object.values(States);

  newAddressForm = new FormGroup({
    streetAddress: new FormControl(this.data.address.streetAddress, [Validators.required]),
    aptNumber: new FormControl(this.data.address.aptNumber),
    city: new FormControl(this.data.address.city, [Validators.required]),
    state: new FormControl(this.data.address.state, [Validators.required]),
    zipCode: new FormControl(this.data.address.zipCode, [Validators.required, Validators.minLength(5), Validators.pattern((/^[0-9\-]+$/))]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<EditAddressComponent>) { 
  }

  ngOnInit(): void {}

  //If close button is clicked, resets streetAddress to '', stopping any changes from being saved.
  onClose() {
    this.data.streetAddress = '';
    this.dialogRef.close(this.data);
  }

  //Uses "newAddressForm" to ensure that all values entered are valid.
  //If they are, data is updated and returned back to the parent.
  updateAddress(e: any) {
    e.preventDefault();
    if(this.newAddressForm.valid) {
      this.data.streetAddress = this.newAddressForm.value.streetAddress!;
      this.data.aptNumber = this.newAddressForm.value.aptNumber!;
      this.data.city = this.newAddressForm.value.city!;
      this.data.state = this.newAddressForm.value.state!;
      this.data.zipCode = this.newAddressForm.value.zipCode!;
      this.dialogRef.close(this.data);
    } else {
      this.newAddressForm.markAllAsTouched();
    }
  }

}
