import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {NgModel} from '@angular/forms';
@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent implements OnInit {
  monthYear: number;
  month = {id: 1, name: 'January'};
  months = [{id: 1, name: 'January'} , {id: 2, name: 'Feburay'}];
  totalIncome: number;
  rerender = false;

  constructor(private cdRef: ChangeDetectorRef) { }
  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }
  ngOnInit() {
    const dt = new Date();
    let mm = (dt.getMonth() + 1).toString();
    if (Number.parseInt(mm) < 10) {
      mm = '0' + mm.toString();
    }
    const monthYear = Number.parseInt(dt.getFullYear().toString() + mm);
    if (!this.monthYear) {
      this.monthYear = monthYear;
    }
    let income = Number.parseFloat(localStorage.getItem('totalIncome' + this.monthYear.toString()));
    if (!income) {
      this.totalIncome = 0;
    } else {
      this.totalIncome = income;
    }
  }
  monthYearClick(monthYear: number) {
    console.log(monthYear);
    if (!isNaN(monthYear) && monthYear.toString().length === 6) {
      this.monthYear = monthYear;
      this.doRerender();
    }
  }
  incomeChanged(income) {
    localStorage.setItem('totalIncome' + this.monthYear.toString(), parseFloat(parseFloat(income).toFixed(2)));
  }
  showBreakdownChart(monthYear: number) {
    document.getElementById('incomechartarea').classList.add('hidden');
    document.getElementById('chartarea').classList.toggle('hidden');
  }
  showIncomeChart(monthYear: number) {
    document.getElementById('chartarea').classList.add('hidden');
    document.getElementById('incomechartarea').classList.toggle('hidden');
  }
}
