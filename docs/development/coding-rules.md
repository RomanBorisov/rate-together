# Coding Rules - Rate Together

> **For**: AI assistants
> **Purpose**: Mandatory coding patterns and best practices

---

## Angular Component Pattern

### Required Structure

```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, /* other imports */],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.some-class]': 'someCondition()',
    '(click)': 'handleClick()'
  }
})
export class ComponentName {
  // Dependency injection via inject()
  private someService = inject(SomeService);

  // Inputs via function syntax
  requiredData = input.required<DataType>();
  optionalData = input<DataType>(defaultValue);

  // Outputs via function syntax
  itemSelected = output<ItemType>();

  // State via signals
  localState = signal(initialValue);

  // Derived state via computed
  derivedValue = computed(() => this.localState() * 2);

  // Methods
  handleClick(): void {
    this.itemSelected.emit(someValue);
  }
}
```

### Forbidden Patterns

❌ **Never use**:
- `@Input()` decorator
- `@Output()` decorator
- `@HostBinding()` decorator
- `@HostListener()` decorator
- Constructor dependency injection
- `standalone: true` explicitly (it's default)

---

## Template Syntax

### Required Control Flow

```html
<!-- Conditionals -->
@if (condition()) {
  <div>Content</div>
} @else if (otherCondition()) {
  <div>Other</div>
} @else {
  <div>Default</div>
}

<!-- Loops -->
@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <div>No items</div>
}

<!-- Switch -->
@switch (status()) {
  @case ('loading') {
    <div>Loading...</div>
  }
  @case ('success') {
    <div>Success!</div>
  }
  @default {
    <div>Unknown</div>
  }
}
```

### Required Bindings

```html
<!-- Class bindings -->
<div [class.active]="isActive()" [class.disabled]="isDisabled()">

<!-- Style bindings -->
<div [style.width.px]="width()" [style.color]="color()">

<!-- Multiple classes -->
<div [class]="'base-class ' + (isActive() ? 'active' : '')">
```

### Forbidden Syntax

❌ **Never use**:
- `*ngIf`, `*ngFor`, `*ngSwitch`
- `[ngClass]`, `[ngStyle]`
- Structural directives with asterisk

---

## Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private httpClient = inject(HttpClient);

  // Private writable signals
  private dataSignal = signal<DataType[]>([]);
  private loadingSignal = signal(false);

  // Public readonly signals
  readonly data = this.dataSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  // Computed values
  readonly count = computed(() => this.data().length);

  // Methods returning observables
  load(): Observable<DataType[]> {
    this.loadingSignal.set(true);
    return this.httpClient.get<DataType[]>('/api/data').pipe(
      tap(data => {
        this.dataSignal.set(data);
        this.loadingSignal.set(false);
      })
    );
  }

  add(item: DataType): Observable<DataType> {
    return this.httpClient.post<DataType>('/api/data', item).pipe(
      tap(newItem => {
        this.dataSignal.update(items => [...items, newItem]);
      })
    );
  }

  update(id: string, updates: Partial<DataType>): Observable<DataType> {
    return this.httpClient.patch<DataType>(`/api/data/${id}`, updates).pipe(
      tap(updated => {
        this.dataSignal.update(items =>
          items.map(item => item.id === id ? updated : item)
        );
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/data/${id}`).pipe(
      tap(() => {
        this.dataSignal.update(items => items.filter(item => item.id !== id));
      })
    );
  }
}
```

---

## Component Types

### Smart Component (Container/Page)

**Location**: `features/{feature}/pages/`

**Responsibilities**:
- Inject services
- Manage business logic
- Handle routing
- Pass data to presentation components via inputs
- Handle events from presentation components

**Pattern**:
```typescript
export class PageComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  // Expose service data
  items = this.dataService.items;
  loading = this.dataService.loading;

  // Handle events
  onItemClick(id: string): void {
    this.router.navigate(['/detail', id]);
  }
}
```

### Presentation Component (Dumb)

**Location**: `features/{feature}/components/` or `shared/components/`

**Responsibilities**:
- Receive data via inputs
- Emit events via outputs
- Pure UI rendering
- No service injection
- No business logic

**Pattern**:
```typescript
export class CardComponent {
  item = input.required<ItemType>();
  compact = input<boolean>(false);

  itemClicked = output<string>();

  onClick(): void {
    this.itemClicked.emit(this.item().id);
  }
}
```

---

## Reactive Forms

```typescript
export class FormComponent {
  private formBuilder = inject(FormBuilder);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['']
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    // Submit logic
  }

  get nameControl() {
    return this.form.get('name')!;
  }
}
```

**Template validation**:
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name" [class.error]="nameControl.invalid && nameControl.touched">

  @if (nameControl.invalid && nameControl.touched) {
    <div class="error-message">
      @if (nameControl.errors?.['required']) {
        Field is required
      }
      @if (nameControl.errors?.['minlength']) {
        Minimum 3 characters
      }
    </div>
  }

  <button type="submit" [disabled]="form.invalid || isSubmitting()">
    {{ isSubmitting() ? 'Submitting...' : 'Submit' }}
  </button>
</form>
```

---

## Common Patterns

### Loading States

```typescript
loading = signal(false);
error = signal<string | null>(null);
data = signal<DataType | null>(null);
```

```html
@if (loading()) {
  <div class="spinner">Loading...</div>
} @else if (error()) {
  <div class="error">{{ error() }}</div>
} @else if (data()) {
  <div>{{ data() | json }}</div>
} @else {
  <div>No data</div>
}
```

### Pagination

```typescript
page = signal(1);
pageSize = signal(20);
total = signal(0);

totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
hasNext = computed(() => this.page() < this.totalPages());
hasPrev = computed(() => this.page() > 1);

nextPage(): void {
  if (this.hasNext()) this.page.update(p => p + 1);
}
```

### Search/Filter

```typescript
allItems = signal<ItemType[]>([]);
searchQuery = signal('');
selectedFilters = signal<string[]>([]);

filteredItems = computed(() => {
  let items = this.allItems();

  const query = this.searchQuery().toLowerCase();
  if (query) {
    items = items.filter(item =>
      item.title.toLowerCase().includes(query)
    );
  }

  const filters = this.selectedFilters();
  if (filters.length > 0) {
    items = items.filter(item =>
      filters.some(f => item.tags.includes(f))
    );
  }

  return items;
});
```

---

## Performance Rules

1. **Always** use `ChangeDetectionStrategy.OnPush`
2. **Always** use `track` in `@for` loops
3. Use `computed()` for derived state (not getters)
4. Use `readonly` signals for public state
5. Lazy load all features
6. Use optimized image directive for images

---

## Import Order

```typescript
// 1. Angular core
import { Component, signal, computed, inject } from '@angular/core';

// 2. Angular common
import { CommonModule } from '@angular/common';

// 3. Angular router/forms
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// 4. RxJS
import { Observable, tap, catchError } from 'rxjs';

// 5. Core layer (using aliases)
import { SomeService } from '@core/services/some.service';
import type { SomeType } from '@core/models/some.model';

// 6. Feature layer
import { FeatureService } from '../../services/feature.service';

// 7. Shared layer
import { ButtonComponent } from '@shared/components/button/button.component';
```

---

## File Naming

- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Guards: `guard-name.guard.ts`
- Pipes: `pipe-name.pipe.ts`
- Models: `entity-name.model.ts`
- DTOs: `entity-name.dto.ts`

All use **kebab-case**.

---

**Version**: 1.0
**Updated**: 2025-11-10
