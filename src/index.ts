// ---------- 1. User (base class) ----------
class User {
  public readonly id: number;
  public name: string;
  public email: string;
  private password: string;
  protected phone: string;
  private _age: number = 0;

  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this._age = value;
  }

  displayInfo(): void {
    console.log(
      `User #${this.id} | Name: ${this.name} | Email: ${this.email} | Phone: ${this.phone} | Age: ${this.age}`,
    );
  }

  // ---------- 5. Aggregation: User -> NoteBook ----------
  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  removeNotebook(notebookId: number): void {
    this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
  }

  getNotebooks(): NoteBook[] {
    return this.notebooks;
  }
}

// ---------- 2. Admin (inheritance) ----------
class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  manageNotes(notebook: NoteBook, noteId: number): void {
    console.log(
      `Admin ${this.name} is removing note ${noteId} from "${notebook.title}"`,
    );
    notebook.removeNote(noteId);
  }

  displayInfo(): void {
    super.displayInfo();
    console.log(`(Admin contact: ${this.phone})`);
  }
}

// ---------- 3. Note ----------
class Note {
  public readonly id: number;
  public title: string;
  public content: string;
  public readonly userId: number;

  // ---------- 6. Association: Note -> User ----------
  public readonly author: User;

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.userId = author.id;
  }

  preview(): string {
    return this.content.length > 20
      ? this.content.slice(0, 20) + "..."
      : this.content;
  }
}

// ---------- 4. NoteBook (composition with Note) ----------
class NoteBook {
  public readonly id: number;
  public title: string;

  private notes: Note[] = [];
  private nextNoteId: number = 1;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextNoteId++, title, content, author);
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }

  getNotes(): Note[] {
    return [...this.notes];
  }
}

// ---------- 7. Generic Storage ----------
class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

// ---------- Testing everything ----------
const user = new User(
  1,
  "Abdelrahman",
  "abd@example.com",
  "12345",
  "01000000000",
  24,
);
const admin = new Admin(
  2,
  "Sara",
  "sara@example.com",
  "admin123",
  "01111111111",
  30,
);

user.displayInfo();
admin.displayInfo();

try {
  new User(3, "Kid", "kid@example.com", "1", "010", 15);
} catch (e) {
  console.log("Error:", (e as Error).message);
}

const notebook = new NoteBook(1, "Study Notes");
user.addNotebook(notebook);

notebook.addNote(
  "TypeScript",
  "Classes, generics and access modifiers are important",
  user,
);
notebook.addNote(
  "UML",
  "Inheritance, composition, aggregation, association",
  user,
);

notebook
  .getNotes()
  .forEach((n) =>
    console.log(
      `Note ${n.id} by ${n.author.name} (userId ${n.userId}): ${n.preview()}`,
    ),
  );

admin.manageNotes(notebook, 1);
console.log("Notes left:", notebook.getNotes().length);

const numbers = new Storage<number>();
numbers.addItem(10);
numbers.addItem(20);
numbers.removeItem(10);
console.log("Numbers:", numbers.getAllItems());

const users = new Storage<User>();
users.addItem(user);
users.addItem(admin);
console.log("Users stored:", users.getAllItems().length);

export {};
