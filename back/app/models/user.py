from ..database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    phone_number = db.Column(db.String(20))
    address = db.Column(db.String(255))  # Dodato polje za adresu
    status = db.Column(db.String(20), default="pending")  # pending, approved, rejected

    # Column to store role
    role = db.Column(db.String(50), nullable=False, default="user")  # Example: 'admin', 'user', etc.

    # New column for tracking first login
    is_first_login = db.Column(db.Boolean, default=True, nullable=False)  # True by default

    # Relationships
    discussions = db.relationship('Discussion', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"
