import { Component, OnInit, Input } from '@angular/core';
import { BudgetCategory } from '../budget-category';
import { BUDGETCATEGORIES } from '../mock-budget-categories';
import { BudgetItem } from '../budget-item';
import { BudgetItemService } from '../budget-item.service';
@Component({
  selector: 'app-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.css']
})
export class BudgetCategoryComponent implements OnInit {
  @Input() monthYear: number;
  selectedCategory: BudgetCategory;
  budgetCategories = BUDGETCATEGORIES;
  newBudgetItem: BudgetItem;
  isCurrentMonth: boolean;

  constructor(private budgetItemService: BudgetItemService) { }

  ngOnInit() {
    let dt = new Date();
    let mm = (dt.getMonth() + 1).toString();
    if (Number.parseInt(mm) < 10) {
      mm = '0' + mm.toString();
    }
    const monthYear = (dt.getFullYear().toString() + mm);
    if (this.monthYear == Number.parseInt(monthYear)) {
      this.isCurrentMonth = true;
    } else {
      this.isCurrentMonth = false;
    }
  }
  // todo migrate to service
  add(name, amount, category) {
    const oldBudget = JSON.parse(localStorage.getItem('budgetItems'));
    const newItem = {'name': '', 'amount': '', 'category': '', 'id': ''};
    newItem.name = name;
    newItem.amount = amount;
    newItem.category = category;
    newItem.id = oldBudget.length;
    oldBudget.push(newItem);
    localStorage.setItem('budgetItems', JSON.stringify(oldBudget));
    window.location.reload();
}
  addClick(category) {
    const modal = document.getElementById('modal' + category.toString());
    const btn = document.getElementById('btnAdd' + category.toString());
    const btnClose = document.getElementById('btnAddClose' + category.toString());
    btnClose.style.display = 'inline-block';
    btn.style.display = 'none';
    modal.style.display = 'inline-block';
  }
  closeAddClick(category) {
    const modal = document.getElementById('modal' + category.toString());
    const btnClose = document.getElementById('btnAddClose' + category.toString());
    const btn = document.getElementById('btnAdd' + category.toString());
    btnClose.style.display = 'none';
    modal.style.display = 'none';
    btn.style.display = 'inline-block';
  }
}
