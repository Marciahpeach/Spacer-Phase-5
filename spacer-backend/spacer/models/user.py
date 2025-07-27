from spacer.extensions import db
import bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=True)  # Nullable for social login
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    role = db.Column(db.Enum('landlord', 'tenant'), nullable=False, default='tenant')

    # Relationships
    landlord_agreements = db.relationship('Agreement', foreign_keys='Agreement.landlord_id', backref='landlord', lazy=True)
    tenant_agreements = db.relationship('Agreement', foreign_keys='Agreement.tenant_id', backref='tenant', lazy=True)

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role
        }