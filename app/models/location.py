from .db import db

class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key = True)
    roaster_id = db.Column(db.Integer, db.ForeignKey("roasters.id"), nullable=False)
    name = db.Column(db.String(50), nullable = False)
    lng = db.Column(db.Integer, nullable = False)
    lat = db.Column(db.Integer, nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # associations
    roasters = db.relationship("Roaster", back_populates="locations")
    

    def to_dict(self):
        return {
            "id":self.id,
            "roaster_id":self.roaster_id,
            "name":self.name,
            "lng":self.lng,
            "lat":self.lat,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
