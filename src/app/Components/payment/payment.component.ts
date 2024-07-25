import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  private _CartService = inject(CartService);
  private _ActivatedRoute = inject(ActivatedRoute);
  cardId!: string;
  step1 = true;
  step2 = true;
  step3 = true;

  // hooks
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(({ cartId }) => {
      this.cardId = cartId;
    });
  }

  /// forms
  orderForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  // forms methods
  handleForm() {
    if (this.orderForm.valid) {
      this._CartService.checkOut(this.cardId, this.orderForm.value).subscribe({
        next: (value) => {
          console.log(value);
          // this.step1 = false;
          // this.step2 = false;
          // this.step3 = true;
          // location.href = value.session.url;
          open(value.session.url, '_self');
        },
        error: (error) => console.error(error),
      });
    }
  }
}
