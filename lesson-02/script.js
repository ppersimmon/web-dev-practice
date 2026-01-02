// Task 1

function addParamsToRequest(params) {
    let count = 0;
    return function(data) {
        const result = {
            ...params,
            ...data,
            count: count
        };
        count++;
        return result;
    }
}

const sendData = addParamsToRequest({'access-token': 'qwerty'});

const firstResult = sendData({userData: 'some user data', userId: 1});
console.log('First call: ', firstResult);

const secondResult = sendData({userData: 'some user data', userId: 2});
console.log('Second call: ', secondResult);

// Task 2

const object = {
    getData: function(){
        console.log(`Person name is ${this.name} and age ${this.age}.`)
    }
}

const person = {name: 'Tom', age: '25'};

object.getData.call(person);

const showPersonData = object.getData.bind(person);
showPersonData();

// Task 3

const root = {
    name: 'name',
    type: 'folder',
    children: [
        {
            name: 'folder 1',
            type: 'folder',
            children: [
                {
                    name: 'folder 2',
                    type: 'folder',
                    children: [
                        {
                            name: 'file 3',
                            type: 'file',
                            size: 30
                        }
                    ]
                }
            ]
        },
        {
            name: 'file 1',
            type: 'file',
            size: 10
        },
        {
            name: 'file 2',
            type: 'file',
            size: 20
        }
    ]
};

function findAllFiles (root) {
    let files = [];
    if (root.type === 'file') {
        files.push(root.name);
    }

    if (root.children) {
        for (const child of root.children) {
            const childFiles = findAllFiles(child);
            files.push(...childFiles);
        }
    }
    return files;
}

const result = findAllFiles(root);
console.log(result);

// Task 4
// ES6
class Person {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name} and my phone number is ${this.phone}.`)
    }
}

class Student extends Person{
    constructor(name, phone, course) {
        super(name, phone);
        this.course = course;
    }
    study() {
        console.log(`I am a ${this.course}-year student.`)
    }
}

class Teacher extends Person{
    constructor(name, phone, subject) {
        super(name, phone);
        this.subject = subject;
    }
    teach() {
        console.log(`I teach ${this.subject}.`);
    }
}

const student1 = new Student('Sam', '(555) 555-1234', 'second');
student1.introduce();
student1.study();

const teacher1 = new Teacher('Greg', '(555) 555-9876', 'Physics');
teacher1.introduce();
teacher1.teach();

// ES5
function PersonES5(name, phone) {
    this.name = name;
    this.phone = phone;
}

PersonES5.prototype.introduce = function() {
    console.log(`Hello, my name is ${this.name} and my phone number is ${this.phone}.`);
}

function StudentES5(name, phone, course) {
    PersonES5.call(this, name, phone, course);
    this.course = course;
}

StudentES5.prototype = Object.create(PersonES5.prototype);
StudentES5.prototype.constructor = StudentES5;

StudentES5.prototype.study = function() {
    console.log(`I am a ${this.course}-year student.`);
}

function TeacherES5(name, phone, subject) {
    PersonES5.call(this, name, phone, subject);
    this.subject = subject;
}

TeacherES5.prototype = Object.create(PersonES5.prototype);
TeacherES5.prototype.constructor = TeacherES5;

TeacherES5.prototype.teach = function() {
    console.log(`I teach ${this.subject}.`);
}

const student2 = new StudentES5('Tom', '(555) 555-7744', 'first');
student2.introduce();
student2.study();

const teacher2 = new TeacherES5('Bob', '(555) 555-3278', 'Linear Algebra');
teacher2.introduce();
teacher2.teach();