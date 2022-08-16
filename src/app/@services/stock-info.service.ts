import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StockInfoService {
  apiBaseUrl: string = 'https://finnhub.io/api/v1/';
  constructor(private http: HttpClient) {}

  getStckCompanyNames(symbol: string) {
    return this.http.get(
      `${this.apiBaseUrl}search?q=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getQuotesInfo(symbol: string) {
    return this.http.get(
      `${this.apiBaseUrl}quote?symbol=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getSentimentInfo(symbol: string, from: string, to: string) {
    return this.http.get(
      `${this.apiBaseUrl}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=bu4f8kn48v6uehqi3cqg`
    );
  }
}
