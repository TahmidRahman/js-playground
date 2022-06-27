const employee = {
  name: 'Tahmid',
  age: 29,
  gender: 'male'
};

const newEmployee = { ...employee };
employee.name = 'Tahmid updated';
console.log(newEmployee);
