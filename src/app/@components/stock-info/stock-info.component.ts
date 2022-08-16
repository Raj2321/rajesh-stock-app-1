import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockInfo, Stocks } from 'src/app/@model/stock';
import { StockInfoService } from 'src/app/@services/stock-info.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css'],
})
export class StockInfoComponent implements OnInit {
  stockFormGroup: FormGroup;
  stock: StockInfo[] = [];
  stockList: Stocks[] = [];
  quoteData = [];

  constructor(private readonly stockService: StockInfoService) {}

  ngOnInit(): void {
    this.stockFormGroup = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });

    let stocks = localStorage.getItem('stockData');
    this.stockList = stocks ? JSON.parse(stocks) : [];
  }

  onSubmit() {
    this.getCompanyNames();
  }

  getCompanyNames() {
    this.stockService
      .getCompanyInfo(this.stockFormGroup.value.symbol)
      .subscribe((data: any) => {
        console.log(data);
        let list = {
          description: data.result[0].description,
          symbol: data.result[0].symbol,
        };
        this.stock.push(list);
        setTimeout(() => {
          this.getQuoteDetails();
        }, 500);
      });
  }

  getQuoteDetails() {
    this.stockService
      .getQuotesInfo(this.stockFormGroup.value.symbol)
      .subscribe((data) => {
        this.quoteData.push(data);
        for (var i = 0; i < this.stock.length; i++) {
          this.stockList[i] = {
            description: this.stock[i].description,
            symbol: this.stock[i].symbol,
            d: this.quoteData[i].d,
            c: this.quoteData[i].c,
            o: this.quoteData[i].o,
            h: this.quoteData[i].h,
          };
        }
        localStorage.setItem(
          'stockData',
          JSON.stringify(this.stockList.reverse())
        );
      });
    this.stockFormGroup.reset();
  }

  removeStock(indx: number) {
    this.stockList.splice(indx, 1);
    localStorage.setItem('stockData', JSON.stringify(this.stockList));
  }
}
