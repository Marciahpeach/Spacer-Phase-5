from  spacer.extensions import db
from datetime import datetime

class Billing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    is_paid = db.Column(db.Boolean, default=False)
    payment_date = db.Column(db.DateTime, nullable=True)
    agreement_id = db.Column(db.Integer, db.ForeignKey('agreement.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'due_date': self.due_date.isoformat(),
            'is_paid': self.is_paid,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'agreement_id': self.agreement_id
        }