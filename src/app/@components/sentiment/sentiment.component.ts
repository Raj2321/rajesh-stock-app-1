import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockInfoService } from 'src/app/@services/stock-info.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  sentimentData: Sentiment[] = [];
  symbol: string;
  fromDate: string;
  toDate: string;
  symbolName: string;

  constructor(
    private stockService: StockInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getDateInfo();
    this.getSentimentInfo();
  }

  getDateInfo() {
    const todayDate = new Date().toISOString().slice(0, 10);
    const d = new Date(todayDate);
    d.setMonth(d.getMonth() - 3);
    this.toDate = todayDate;
    this.fromDate = d.toISOString().slice(0, 10);
  }

  getSentimentInfo() {
    this.stockService
      .getSentimentInfo(this.symbol, this.fromDate, this.toDate)
      .subscribe((res) => {
        this.sentimentData = res.data;
        this.symbolName = res.symbol;
      });
  }

  getMonth(num: number) {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[num].toUpperCase();
  }

  getImage(value: number) {
    if (value > 0) {
      return 'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/11-512.png';
    } else {
      return 'https://st2.depositphotos.com/5266903/8456/v/950/depositphotos_84568938-stock-illustration-arrow-down-flat-red-color.jpg';
    }
  }
}

interface Sentiment {
  change: number;
  month: number;
  mspr: number;
  symbol: string;
  year: number;
}
