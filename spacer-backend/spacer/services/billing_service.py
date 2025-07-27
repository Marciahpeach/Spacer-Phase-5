from spacer.models import Agreement, Billing, db
from datetime import datetime, timedelta

def generate_recurring_bills():
    active_agreements = Agreement.query.filter_by(status='active').all()
    
    for agreement in active_agreements:
        last_billing = Billing.query.filter_by(agreement_id=agreement.id)\
            .order_by(Billing.due_date.desc())\
            .first()
            
        if last_billing:
            next_due_date = last_billing.due_date + timedelta(weeks=1) \
                if agreement.payment_interval == 'weekly' \
                else last_billing.due_date + timedelta(days=30)
        else:
            next_due_date = datetime.utcnow() + timedelta(weeks=1) \
                if agreement.payment_interval == 'weekly' \
                else datetime.utcnow() + timedelta(days=30)
        
        billing = Billing(
            amount=agreement.payment_amount,
            due_date=next_due_date,
            agreement_id=agreement.id
        )
        db.session.add(billing)
    
    db.session.commit()
    print("Recurring bills generated successfully")