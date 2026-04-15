# from database import engine

from fastapi import HTTPException
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend running"}

# Create employee (with validation)
@app.post("/employees", response_model=schemas.EmployeeResponse)
def create_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = models.Employee(name=emp.name, role=emp.role)
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp

# Get all employees
@app.get("/employees", response_model=list[schemas.EmployeeResponse])
def get_employees(
    name: str = None,
    role: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Employee)

    if name:
        query = query.filter(models.Employee.name.ilike(f"%{name}%"))

    if role:
        query = query.filter(models.Employee.role.ilike(f"%{role}%"))

    return query.all()

# Update employees' details
@app.put("/employees/{emp_id}", response_model=schemas.EmployeeResponse)
def update_employee(emp_id: int, emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.name = emp.name
    employee.role = emp.role

    db.commit()
    db.refresh(employee)
    return employee

# Delete employees' details
@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted"}