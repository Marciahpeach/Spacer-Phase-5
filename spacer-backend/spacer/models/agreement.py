from spacer.extensions import db

class Agreement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    terms = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum('pending', 'active', 'terminated'), default='pending')
    payment_amount = db.Column(db.Float, nullable=False)
    payment_interval = db.Column(db.Enum('monthly', 'weekly'), nullable=False)
    landlord_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    billings = db.relationship('Billing', backref='agreement', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'terms': self.terms,
            'status': self.status,
            'payment_amount': self.payment_amount,
            'payment_interval': self.payment_interval,
            'landlord_id': self.landlord_id,
            'tenant_id': self.tenant_id
        }