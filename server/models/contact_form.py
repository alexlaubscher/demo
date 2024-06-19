from datetime import datetime
import re
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import validates
import uuid

from models.metadata import MetaDataSingleton

Base = declarative_base(metadata=MetaDataSingleton())


class ContactForm(Base):
    __tablename__ = "contact_form"

    name = Column(String(50), nullable=False)
    email = Column(String(120), nullable=False)
    message = Column(String(500), nullable=False)
    created_at = Column(DateTime, primary_key=True, default=datetime.utcnow, nullable=False)

    @validates("email")
    def validate_email(self, key, email):
        """
        Validates an email address using a regular expression.

        Args:
            self (ContactForm): The instance of the ContactForm class.
            key (str): The key of the email attribute.
            email (str): The email address to be validated.

        Returns:
            str: The validated email address.

        Raises:
            ValueError: If the email address is invalid.
        """
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email")
        return email

    
    @validates("message")
    def validate_message(self, key, message):
        """
        Validates the message field to make sure it is not empty.

        Args:
            self (ContactForm): The instance of the ContactForm class.
            key (str): The key of the message attribute.
            message (str): The message to be validated.

        Returns:
            str: The validated message.

        Raises:
            ValueError: If the message is empty.
        """
        if not message:
            raise ValueError("Message cannot be empty")
        return message

    

    def to_json(self):
        return {
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "created_at": self.created_at,
        }
