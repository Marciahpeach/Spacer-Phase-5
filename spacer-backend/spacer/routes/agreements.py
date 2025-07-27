from flask import Blueprint, request, jsonify
from spacer.extensions import db
from spacer.models import Agreement, Billing
import stripe
from datetime import datetime
from spacer.config import Config
from spacer.utils.auth import jwt_required_and_role

agreements_bp = Blueprint('agreements', __name__)
stripe.api_key = Config.STRIPE_SECRET_KEY

@agreements_bp.route('/', methods=['POST'])
@jwt_required_and_role('landlord')
def create_agreement(current_user):
    from spacer.extensions import db  
    from spacer.models.user import User 
    data = request.get_json()
    
    agreement = Agreement(
        terms=data['terms'],
        payment_amount=data['payment_amount'],
        payment_interval=data['payment_interval'],
        landlord_id=current_user.id,
        tenant_id=data['tenant_id']
    )
    db.session.add(agreement)
    db.session.commit()

    return jsonify(agreement.to_dict()), 201

@agreements_bp.route('/my-agreements', methods=['GET'])
@jwt_required_and_role()
def get_my_agreements(current_user):
    agreements = Agreement.query.filter(
        (Agreement.landlord_id == current_user.id) | 
        (Agreement.tenant_id == current_user.id)
    ).all()
    
    return jsonify([agreement.to_dict() for agreement in agreements])

@agreements_bp.route('/<int:agreement_id>/billings', methods=['POST'])
@jwt_required_and_role('landlord')
def create_billing(current_user, agreement_id):
    agreement = Agreement.query.get_or_404(agreement_id)
    
    # Verify landlord owns the agreement
    if agreement.landlord_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    billing = Billing(
        amount=data['amount'],
        due_date=datetime.strptime(data['due_date'], '%Y-%m-%d'),
        agreement_id=agreement_id
    )
    db.session.add(billing)
    db.session.commit()

    return jsonify(billing.to_dict()), 201

@agreements_bp.route('/billings/<int:billing_id>/pay', methods=['POST'])
@jwt_required_and_role('tenant')
def pay_billing(current_user, billing_id):
    billing = Billing.query.get_or_404(billing_id)
    agreement = Agreement.query.get(billing.agreement_id)
    
    # Verify tenant is part of the agreement
    if agreement.tenant_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    # Simulate Stripe payment
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(billing.amount * 100),
            currency='usd',
            description=f'Payment for agreement {agreement.id}'
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    # Update billing record
    billing.is_paid = True
    billing.payment_date = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        "message": "Payment successful",
        "billing": billing.to_dict(),
        "payment_intent": payment_intent
    })