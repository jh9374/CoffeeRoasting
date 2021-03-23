from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from datetime import datetime
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint("review", __name__)

@review_routes.route("/reviews", methods=["POST"])
@login_required
def create_review():

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    req_user = int(request.form.get("user_id"))

    if current_user.id == req_user:
        
        if form.validate_on_submit():
            review = Review(
                product_id=request.form.get("product_id"),
                user_id=request.form.get("user_id"),
                content=request.form.get("content"),
                roast_rating=request.form.get("roast_rating")
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {"error": "User not logged in"}, 401
    
@review_routes.route("/reviews/<int:id>", methods=["PATCH", "DELETE"])
@login_required
def handle_review(id):

    review = Review.query.filter(Review.id == id).first()

    if review is not None:

        if request.method == "DELETE":
            db.session.delete(review)
            db.session.commit()
            return {"message":"Review deleted"}, 200
        if request.method == "PATCH":

            form = ReviewForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            req_user = int(request.form.get("user_id"))

            if current_user.id == req_user:
                if form.validate_on_submit():

                    review.product_id = request.form.get("product_id")
                    review.user_id = request.form.get("user_id")
                    review.content = request.form.get("content")
                    review.roast_rating = request.form.get("roast_rating")
                    review.updated_at = datetime.now()
                    
                    db.session.add(review)
                    db.session.commit()
                    return review.to_dict(), 201

                return {"errors": validation_errors_to_error_messages(form.errors)}, 400
        
    return {"error": "Review does not exist"}, 404

@review_routes.route("/users/<int:id>/reviews")
@login_required
def user_reviews(id):

    query_results = Review.query.filter(Review.user_id == id).all()
    reviews = {}
    for num, review in enumerate(query_results, start=1):
        reviews[num] = review.to_dict()
    return reviews, 200

@review_routes.route("/products/<int:id>/reviews")
def product_reviews(id):

    query_results = Review.query.filter(Review.product_id == id).all()
    reviews = {}
    for num, review in enumerate(query_results, start=1):
        reviews[num] = review.to_dict()
    return reviews, 200
