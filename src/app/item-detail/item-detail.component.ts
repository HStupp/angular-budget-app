import { Component, OnInit, Input } from '@angular/core';
import { BudgetItem } from '../budget-item';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item: BudgetItem;
  constructor() { }

  ngOnInit() {
  }
  saveClick(id, name, category, amount) {
    if (confirm('Confirm Editing "' + name + '"?')) {
      this.saveChange(id, name, category, amount);
      window.location.reload();
    }
  }
  // should be in service
  saveChange(id, name, category, amount) {
    const oldBudget = JSON.parse(localStorage.getItem('budgetItems'));
    const result = [];
    const newItem = {'id': '', 'name': '', 'category': '', 'amount': ''};
    newItem.id = id;
    newItem.name = name;
    newItem.category = category;
    newItem.amount = amount;

    for (let i = 0; i < oldBudget.length; i++) {
      if (oldBudget[i].id !== id) {
        result.push(oldBudget[i]);
      } else {
        result.push(newItem);
      }
    }
    localStorage.setItem('budgetItems', JSON.stringify(result));
  }
  closeClick(category: string) {
  const categoryDiv = document.getElementById('edit' + category);
  if (categoryDiv) {categoryDiv.classList.toggle('hidden'); }
    }


}
